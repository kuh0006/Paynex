using Microsoft.Extensions.Caching.Memory;
using MM.Contracts.IMerchant;
using MM.Entities.Filters.Interfaces;
using MM.Entities.Models;
using System.Linq.Expressions;

namespace MM.Repository
{
    public class CachedMerchantRepositoryDecorator : IMerchantRepository
    {
        private const string CacheKey_AllMerchants = "AllMerchants";
        private const int CacheDurationInMinutes = 2;
        private readonly IMerchantRepository _innerRepository;
        private readonly IMemoryCache _cache;

        public CachedMerchantRepositoryDecorator(IMerchantRepository merchantRepository, IMemoryCache cache)
        {
            _innerRepository = merchantRepository;
            _cache = cache;
        }

        public void Create(Merchant entity)
        {
            _innerRepository.Create(entity);

            if (_cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? allCached))
                _cache.Set(CacheKey_AllMerchants, allCached?.Append(entity).ToList(), TimeSpan.FromMinutes(CacheDurationInMinutes));
            else
                _cache.Set(CacheKey_AllMerchants, new[] { entity }, TimeSpan.FromMinutes(CacheDurationInMinutes));
        }

        public void Delete(Merchant entity)
        {
            entity.IsDeleted = true; // Mark as deleted instead of removing from DB
            _innerRepository.DeleteMerchant(entity);

            if (_cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? allCached))
            {
                List<Merchant>? updatedList = allCached?.Where(m => m.Id != entity.Id).ToList();
                _cache.Set(CacheKey_AllMerchants, updatedList, TimeSpan.FromMinutes(CacheDurationInMinutes));
            }
        }

        public void Update(Merchant entity)
        {
            _innerRepository.Update(entity);

            if (_cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? allCached))
            {
                List<Merchant>? updatedList = allCached?.Select(m => m.Id == entity.Id ? entity : m).ToList();
                _cache.Set(CacheKey_AllMerchants, updatedList, TimeSpan.FromMinutes(CacheDurationInMinutes));
            }
            else
            {
                _cache.Set(CacheKey_AllMerchants, new[] { entity }, TimeSpan.FromMinutes(CacheDurationInMinutes));
            }
        }

        public IQueryable<Merchant> FindAll() => _innerRepository.FindAll();

        public IQueryable<Merchant> FindByCondition(Expression<Func<Merchant, bool>> expression) => _innerRepository.FindByCondition(expression);

        public async Task<IEnumerable<Merchant>> GetAllAsync()
        {
            _cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? cachedMerchants);

            if (cachedMerchants != null)
                return cachedMerchants;

            IEnumerable<Merchant> data = await _innerRepository.GetAllAsync();

            _cache.Set(CacheKey_AllMerchants, data, TimeSpan.FromMinutes(CacheDurationInMinutes));

            return data;
        }

        public async Task<Merchant?> GetByIdAsync(int id)
        {
            if (_cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? allCached))
            {
                Merchant? fromCache = allCached?.FirstOrDefault(m => m.Id == id);
                if (fromCache != null)
                    return fromCache;
            }

            var merchant = await _innerRepository.GetByIdAsync(id);
            if (merchant == null)
                return null;

            if (_cache.TryGetValue(CacheKey_AllMerchants, out IEnumerable<Merchant>? currentList))
                _cache.Set(CacheKey_AllMerchants, currentList?.Append(merchant).ToList(), TimeSpan.FromMinutes(CacheDurationInMinutes));
            else
                _cache.Set(CacheKey_AllMerchants, new[] { merchant }, TimeSpan.FromMinutes(CacheDurationInMinutes));

            return merchant;
        }

        // It is nessary to go DB bacause the filter can be complex and not cached
        // It is for now, complex problem which requires more thought
        public async Task<IEnumerable<Merchant>> GetFilteredAsync(IFilter<Merchant> filter) => await _innerRepository.GetFilteredAsync(filter);

        public void CreateMerchant(Merchant merchant) => Create(merchant);

        public void DeleteMerchant(Merchant merchant) => Delete(merchant);

        public void UpdateMerchant(Merchant merchant) => Update(merchant);
    }
}
