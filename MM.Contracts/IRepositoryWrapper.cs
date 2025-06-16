using MM.Contracts.IMerchant;

namespace MM.Contracts
{
    public interface IRepositoryWrapper
    {
        IMerchantRepository Merchant { get; }

        void Save();
        Task SaveAsync();
    }
}
