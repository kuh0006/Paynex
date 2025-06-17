using MM.Entities.Models;

namespace MM.Contracts.IMerchant
{
    public interface IMerchantRepository : IRepositoryBase<Merchant>
    {
        Task<IEnumerable<Merchant>> GetAllAsync();
        Task<Merchant?> GetByIdAsync(int id);
        Task<IEnumerable<Merchant>> GetMerchantsByNameAsync(string name);
        Task<IEnumerable<Merchant>> GetMerchantsByCategoryAsync(string category);

        void CreateMerchant(Merchant merchant);
        void UpdateMerchant(Merchant merchant);
        void DeleteMerchant(Merchant merchant);
    }
}
