using Microsoft.Extensions.Logging;
using MM.Contracts;
using MM.Entities.Models;
using MM.Services.Interfaces;

namespace MM.Services.Implementations
{
    public class MerchantService : IMerchantService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly ILogger<MerchantService> _logger;

        public MerchantService(ILogger<MerchantService> logger, IRepositoryWrapper repository)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public Task CreateAsync(Merchant merchant)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            try
            {
                _logger.LogInformation("Deleting merchant with ID: {Id}", id);

                _repository.Merchant.Delete(id);

                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the merchant with ID: {Id}", id);
                throw;
            }
        }

        public Task<IEnumerable<Merchant>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Merchant?> GetByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation("Retrieving merchant by ID: {Id}", id);

                var merchant = await _repository.Merchant.GetByIdAsync(id);

                if (merchant == null)
                    _logger.LogWarning("Merchant with ID: {Id} not found", id);

                return merchant;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the merchant with ID: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<Merchant>> GetByNameAsync(string name)
        {
            try
            {
                _logger.LogInformation("Retrieving merchants by name: {Name}", name);
                
                var merchants = _repository.Merchant.GetMerchantsByNameAsync(name);

                if (merchants == null || !merchants.Any())
                    _logger.LogWarning("No merchants found with name: {Name}", name);
            
                return  merchants;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving merchants by name: {Name}", name);
                throw;
            }
        }

        public Task UpdateAsync(Merchant merchant)
        {
            throw new NotImplementedException();
        }
    }
}
