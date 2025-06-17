using AutoMapper;
using Microsoft.Extensions.Logging;
using MM.Contracts;
using MM.Entities.DTOs.Merchant;
using MM.Entities.Filters.Composite;
using MM.Entities.Filters.Interfaces;
using MM.Entities.Models;
using MM.Services.Interfaces;

namespace MM.Services.Implementations
{
    public class MerchantService : IMerchantService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<MerchantService> _logger;

        public MerchantService(ILogger<MerchantService> logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<int> CreateAsync(MerchantCreateDto merchant)
        {
            try
            {
                if (merchant == null)
                {
                    _logger.LogError("Merchant object is null");
                    throw new ArgumentNullException(nameof(merchant), "Merchant cannot be null");
                }

                _logger.LogInformation("Creating a new merchant with name: {Name}", merchant.Name);

                // Map DTO to Entity
                Merchant merchantEntity = _mapper.Map<Merchant>(merchant);
                _repository.Merchant.CreateMerchant(merchantEntity);

                await _repository.SaveAsync();
                _logger.LogInformation("Merchant with name: {Name} created successfully", merchant.Name);

                return merchantEntity.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a new merchant");
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                _logger.LogInformation("Deleting merchant with ID: {Id}", id);
                Merchant? merchant = await _repository.Merchant.GetByIdAsync(id);

                if (merchant == null)
                {
                    _logger.LogWarning("Merchant with ID: {Id} not found", id);
                    return false;
                }

                _repository.Merchant.DeleteMerchant(merchant);

                await _repository.SaveAsync();
                _logger.LogInformation("Merchant with ID: {Id} deleted successfully", id);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the merchant with ID: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<MerchantReadDto>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation("Retrieving all merchants");
                IEnumerable<Merchant> merchants = await _repository.Merchant.GetAllAsync();

                if (!merchants.Any())
                    _logger.LogWarning("No merchants found");

                return _mapper.Map<IEnumerable<MerchantReadDto>>(merchants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving all merchants");
                throw;

            }
        }

        public async Task<MerchantReadDto?> GetByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation("Retrieving merchant by ID: {Id}", id);

                Merchant? merchant = await _repository.Merchant.GetByIdAsync(id);

                if (merchant == null)
                    _logger.LogWarning("Merchant with ID: {Id} not found", id);

                return _mapper.Map<MerchantReadDto>(merchant);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the merchant with ID: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<MerchantReadDto>> GetByNameAsync(string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    _logger.LogError("Name parameter is null or empty");
                    throw new ArgumentException("Name cannot be null or empty", nameof(name));
                }

                _logger.LogInformation("Retrieving merchants by name: {Name}", name);

                IEnumerable<Merchant>? merchants = await
                    _repository.Merchant.GetMerchantsByNameAsync(name);

                if (!merchants.Any())
                    _logger.LogWarning("No merchants found with name: {Name}", name);

                return _mapper.Map<IEnumerable<MerchantReadDto>>(merchants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving merchants by name: {Name}", name);
                throw;
            }
        }

        public async Task<IEnumerable<MerchantReadDto>> GetByCategoryAsync(string category)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(category))
                {
                    _logger.LogError("Category parameter is null or empty");
                    throw new ArgumentException("Category cannot be null or empty", nameof(category));
                }

                _logger.LogInformation("Retrieving merchants by category: {Category}", category);

                IEnumerable<Merchant>? merchants = await
                    _repository.Merchant.GetMerchantsByCategoryAsync(category);

                if (!merchants.Any())
                    _logger.LogWarning("No merchants found with category: {Category}", category);

                return _mapper.Map<IEnumerable<MerchantReadDto>>(merchants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving merchants by category: {Category}", category);
                throw;
            }
        }

        public async Task<IEnumerable<MerchantReadDto>> GetFilteredAsync(CompositeFilter<Merchant> filter)
        {
            try
            {
                if (filter == null)
                {
                    _logger.LogError("Filter object is null");
                    throw new ArgumentNullException(nameof(filter), "Filter cannot be null");
                }

                _logger.LogInformation("Retrieving merchants with filter: {Filter}", filter);

                IEnumerable<Merchant> merchants = await _repository.Merchant.GetFilteredAsync(filter);

                if (!merchants.Any())
                    _logger.LogWarning("No merchants found with the specified filter");

                return _mapper.Map<IEnumerable<MerchantReadDto>>(merchants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while filtering merchants");
                throw;
            }
        }

        public async Task<bool> UpdateAsync(MerchantUpdateDto merchant)
        {
            try
            {
                _logger.LogInformation("Updating merchant with ID: {Id}", merchant.Id);
                if (merchant == null)
                {
                    _logger.LogError("Merchant object is null");
                    throw new ArgumentNullException(nameof(merchant), "Merchant cannot be null");
                }

                Merchant? existingMerchant = await _repository.Merchant.GetByIdAsync(merchant.Id);
                if (existingMerchant == null)
                {
                    _logger.LogWarning("Merchant with ID: {Id} not found", merchant.Id);
                    return false;
                }

                _mapper.Map(merchant, existingMerchant);
                _repository.Merchant.UpdateMerchant(existingMerchant);

                await _repository.SaveAsync();
                _logger.LogInformation("Merchant with ID: {Id} updated successfully", merchant.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the merchant with ID: {Id}", merchant.Id);
                throw;
            }
        }
    }
}
