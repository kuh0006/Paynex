using MM.Entities.Filters.Base;

namespace MM.Entities.Filters.Implementations
{
    /// <summary>
    /// Represents a filter that filters entities based on a specific value.
    /// </summary>
    /// <typeparam name="T">The type of entity being filtered.</typeparam>
    /// <typeparam name="V">The type of value being used for filtering.</typeparam>
    public class FilterByValue<T, V> : CriteriaFilter<T, V> where T : class
    {
        /// <summary>
        /// Gets or sets the value used for filtering.
        /// </summary>
        protected V _Value { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="FilterByValue{T, V}"/> class.
        /// </summary>
        /// <param name="criterion">The criterion used for evaluating the entity.</param>
        /// <param name="value">The value used for filtering.</param>
        public FilterByValue(Criterion<V, T> criterion, V value) : base(criterion) => _Value = value;

        /// <summary>
        /// Determines whether the specified entity satisfies the filter criteria.
        /// </summary>
        /// <param name="entity">The entity to be evaluated.</param>
        /// <returns><c>true</c> if the entity satisfies the filter criteria; otherwise, <c>false</c>.</returns>
        public override bool IsSatisfiedBy(T entity) => _criterion.Evaluate(entity)!.Equals(_Value);
    }
}
