using Microsoft.EntityFrameworkCore;
using MM.Contracts.IMerchant;
using MM.Entities;
using MM.Entities.Filters.Interfaces;
using MM.Entities.Models;

namespace MM.Repository
{
    public class MerchantRepository : RepositoryBase<Merchant>, IMerchantRepository
    {
        public MerchantRepository(RepositoryContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<Merchant>> GetAllAsync() =>
            await FindByCondition(merchant => !merchant.IsDeleted)
                    .OrderBy(merchant => merchant.Name)
                        .ToListAsync();

        public async Task<Merchant?> GetByIdAsync(int id) =>
            await FindByCondition(merchant => merchant.Id == id && !merchant.IsDeleted)
                    .FirstOrDefaultAsync();
        public async Task<IEnumerable<Merchant>> GetFilteredAsync(IFilter<Merchant> filter)
        {
            // This could be done in DB instead of in memory, because of lack of time it is done in memory
            // Filter should provide expression for LINQ
            List<Merchant> data = await FindByCondition(merchant => !merchant.IsDeleted)
                                         .OrderBy(merchant => merchant.Name)
                                            .ToListAsync();

            return [.. data.Where(filter.IsSatisfiedBy)];
        }

        public void CreateMerchant(Merchant merchant) => Create(merchant);

        public void DeleteMerchant(Merchant merchant)
        {
            merchant.IsDeleted = true;
            UpdateMerchant(merchant);
        }

        public void UpdateMerchant(Merchant merchant) => Update(merchant);
    }
}
