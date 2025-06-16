using MM.Entities.Models;

namespace MM.Services.Interfaces
{
    public interface IMerchantService
    {
        Task<Merchant?> GetByIdAsync(int id);
        Task<IEnumerable<Merchant>> GetByNameAsync(string name);
        Task<IEnumerable<Merchant>> GetAllAsync();

        Task CreateAsync(Merchant merchant);
        Task UpdateAsync(Merchant merchant);
        Task DeleteAsync(int id);
    }
}
