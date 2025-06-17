namespace MM.Entities.Filters.Interfaces
{
    public interface IFilter<T> where T : class
    {
        bool IsSatisfiedBy(T entity);
    }
}
