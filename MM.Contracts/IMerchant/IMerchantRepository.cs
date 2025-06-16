using MM.Entities.Models;

namespace MM.Contracts.IMerchant
{
    public interface IMerchantRepository : IRepositoryBase<Merchant>
    {
        Task<IEnumerable<Merchant>> GetAllAsync();
        Task<Merchant> GetByIdAsync(int id);
        Task<Merchant> GetByWithDetailsAsync(int id);
        Task<Merchant> GetMerchantByNameAsync(string name);

        void CreateProject(Merchant merchant);
        void UpdateProject(Merchant merchant);
        void DeleteProject(Merchant merchant);
    }
}
