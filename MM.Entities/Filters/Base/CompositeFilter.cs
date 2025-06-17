using MM.Entities.Filters.Interfaces;

namespace MM.Entities.Filters.Base
{
    /// <summary>
    /// Represents a composite filter that combines multiple filters to filter entities of type T.
    /// </summary>
    /// <typeparam name="T">The type of entities to filter.</typeparam>
    public class CompositeFilter<T> : IFilter<T> where T : class
    {
        private List<IFilter<T>> _filters { get; set; } = [];

        /// <summary>
        /// Determines whether the specified entity satisfies all the filters in the composite filter.
        /// </summary>
        /// <param name="entity">The entity to be checked.</param>
        /// <returns><c>true</c> if the entity satisfies all the filters; otherwise, <c>false</c>.</returns>
        public bool IsSatisfiedBy(T entity)
        {
            foreach (var filter in _filters)
            {
                if (!filter.IsSatisfiedBy(entity))
                    return false;
            }

            return true;
        }

        /// <summary>
        /// Adds a filter to the composite filter.
        /// </summary>
        /// <param name="filter">The filter to be added.</param>
        public void AddFilter(IFilter<T> filter) => _filters.Add(filter);

        /// <summary>
        /// Removes a filter from the composite filter.
        /// </summary>
        /// <param name="filter">The filter to be removed.</param>
        public void RemoveFilter(IFilter<T> filter) => _filters.Remove(filter);

        /// <summary>
        /// Filters a list of entities using the composite filter.
        /// </summary>
        /// <param name="entities">The list of entities to be filtered.</param>
        /// <returns>A list of entities that satisfy the composite filter.</returns>
        public List<T> FilterEntities(List<T> entities)
        {
            List<T> filteredEntities = [];

            foreach (var entity in entities)
            {
                if (IsSatisfiedBy(entity))
                    filteredEntities.Add(entity);
            }

            return filteredEntities;
        }
    }
}
