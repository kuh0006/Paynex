namespace MM.Contracts
{
    public interface IRepositoryWrapper
    {

        void Save();
        Task SaveAsync();
    }
}
