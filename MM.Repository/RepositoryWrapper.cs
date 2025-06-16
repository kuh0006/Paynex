using MM.Contracts;
using MM.Contracts.IMerchant;
using MM.Entities;

namespace MM.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private IMerchantRepository? _merchantRepository;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }

        public IMerchantRepository Merchant
        {
            get
            {
                if (_merchantRepository == null)
                    _merchantRepository = new MerchantRepository(_repoContext);

                return _merchantRepository;
            }

        }

        public void Save() => _repoContext.SaveChanges();
        public async Task SaveAsync() => await _repoContext.SaveChangesAsync();
    }
}
