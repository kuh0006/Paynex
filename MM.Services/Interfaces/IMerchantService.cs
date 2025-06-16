using MM.Entities.DTOs.Merchant;

namespace MM.Services.Interfaces
{
    public interface IMerchantService
    {
        Task<MerchantReadDto?> GetByIdAsync(int id);
        Task<IEnumerable<MerchantReadDto>> GetByNameAsync(string name);
        Task<IEnumerable<MerchantReadDto>> GetAllAsync();

        Task<int> CreateAsync(MerchantCreateDto merchant);
        Task<bool> UpdateAsync(MerchantUpdateDto merchant);
        Task<bool> DeleteAsync(int id);
    }
}
