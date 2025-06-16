using Microsoft.EntityFrameworkCore;
using MM.Contracts.IMerchant;
using MM.Entities;
using MM.Entities.Models;

namespace MM.Repository
{
    public class MerchantRepository : RepositoryBase<Merchant>, IMerchantRepository
    {
        public MerchantRepository(RepositoryContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<Merchant>> GetAllAsync() =>
            await FindAll().OrderBy(merchant => merchant.Name).ToListAsync();

        public async Task<Merchant?> GetByIdAsync(int id) =>
            await FindByCondition(merchant => merchant.Id == id).FirstOrDefaultAsync();

        public async Task<Merchant?> GetMerchantByNameAsync(string name) =>
            await FindByCondition(merchant => merchant.Name.Equals(name)).FirstOrDefaultAsync();

        public void CreateMerchant(Merchant merchant) => Create(merchant);

        public void DeleteMerchant(Merchant merchant) => Delete(merchant);

        public void UpdateMerchant(Merchant merchant) => Update(merchant);
    }
}
