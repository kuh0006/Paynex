using MM.Entities.Filters.Interfaces;
using MM.Entities.Models;

namespace MM.Contracts.IMerchant
{
    public interface IMerchantRepository : IRepositoryBase<Merchant>
    {
        Task<IEnumerable<Merchant>> GetAllAsync();
        Task<Merchant?> GetByIdAsync(int id);
        Task<IEnumerable<Merchant>> GetFilteredAsync(IFilter<Merchant> filter);

        void CreateMerchant(Merchant merchant);
        void UpdateMerchant(Merchant merchant);
        void DeleteMerchant(Merchant merchant);
    }
}
