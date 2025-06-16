using MM.Contracts;
using MM.Contracts.IMerchant;
using MM.Entities;

namespace MM.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _applicationContext;
        private IMerchantRepository? _merchantRepository;

        public RepositoryWrapper(RepositoryContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public IMerchantRepository Merchant
        {
            get
            {
                if (_merchantRepository == null)
                    _merchantRepository = new MerchantRepository(_applicationContext);

                return _merchantRepository;
            }

        }

        public void Save() => _applicationContext.SaveChanges();
        public async Task SaveAsync() => await _applicationContext.SaveChangesAsync();
    }
}
