using MM.Contracts;
using MM.Contracts.IMerchant;
using MM.Entities;

namespace MM.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _applicationContext;
        private IMerchantRepository _merchantRepository;

        public RepositoryWrapper(RepositoryContext applicationContext, IMerchantRepository merchantRepository)
        {
            _applicationContext = applicationContext;
            _merchantRepository = merchantRepository;
        }

        public IMerchantRepository Merchant
        {
            get
            {
                return _merchantRepository;
            }

        }

        public void Save() => _applicationContext.SaveChanges();
        public async Task SaveAsync() => await _applicationContext.SaveChangesAsync();
    }
}
