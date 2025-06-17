using MM.Entities.DTOs.Merchant;
using MM.Entities.Filters.Composite;
using MM.Entities.Models;

namespace MM.Services.Interfaces
{
    public interface IMerchantService
    {
        Task<MerchantReadDto?> GetByIdAsync(int id);
        Task<IEnumerable<MerchantReadDto>> GetAllAsync();
        Task<IEnumerable<MerchantReadDto>> GetFilteredAsync(CompositeFilter<Merchant> filter);

        Task<Merchant> CreateAsync(MerchantCreateDto merchant);
        Task<bool> UpdateAsync(MerchantUpdateDto merchant);
        Task<bool> DeleteAsync(int id);
    }
}
