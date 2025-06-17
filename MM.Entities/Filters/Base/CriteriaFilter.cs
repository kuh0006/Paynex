using MM.Entities.Filters.Interfaces;

namespace MM.Entities.Filters.Base
{
    /// <summary>
    /// Represents a criteria filter used to filter entities based on a specific criterion.
    /// </summary>
    /// <typeparam name="T">The type of entity being filtered.</typeparam>
    /// <typeparam name="V">The type of criterion used for filtering.</typeparam>
    public class CriteriaFilter<T, V> : IFilter<T> where T : class
    {
        protected Criterion<V, T> _criterion { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="CriteriaFilter{T, V}"/> class with the specified criterion.
        /// </summary>
        /// <param name="criterion">The criterion used for filtering.</param>
        public CriteriaFilter(Criterion<V, T> criterion)
        {
            _criterion = criterion;
        }

        /// <summary>
        /// Determines whether the specified entity satisfies the filter criteria.
        /// </summary>
        /// <param name="entity">The entity to be evaluated.</param>
        /// <returns><c>true</c> if the entity satisfies the filter criteria; otherwise, <c>false</c>.</returns>
        public virtual bool IsSatisfiedBy(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
