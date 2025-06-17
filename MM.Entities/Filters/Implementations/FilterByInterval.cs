using MM.Entities.Filters.Base;

namespace MM.Entities.Filters.Implementations
{
    /// <summary>
    /// Represents a filter that checks if a criterion value falls within a specified interval.
    /// </summary>
    /// <typeparam name="T">The type of entity being filtered.</typeparam>
    /// <typeparam name="V">The type of criterion value being evaluated.</typeparam>
    public class FilterByInterval<T, V> : CriteriaFilter<T, V> where T : class where V : class, IComparable<V>
    {
        /// <summary>
        /// Gets or sets the minimum value of the interval.
        /// </summary>
        protected V _MinValue { get; set; }

        /// <summary>
        /// Gets or sets the maximum value of the interval.
        /// </summary>
        protected V _MaxValue { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="FilterByInterval{T, V}"/> class.
        /// </summary>
        /// <param name="criterion">The criterion used to evaluate the entity.</param>
        /// <param name="minValue">The minimum value of the interval.</param>
        /// <param name="maxValue">The maximum value of the interval.</param>
        public FilterByInterval(Criterion<V, T> criterion, V minValue, V maxValue) : base(criterion)
        {
            _MinValue = minValue;
            _MaxValue = maxValue;
        }

        /// <summary>
        /// Determines whether the specified entity satisfies the filter criteria.
        /// </summary>
        /// <param name="entity">The entity to be evaluated.</param>
        /// <returns><c>true</c> if the entity satisfies the filter criteria; otherwise, <c>false</c>.</returns>
        public override bool IsSatisfiedBy(T entity)
        {
            V criterionValue = _criterion.Evaluate(entity);

            return criterionValue.CompareTo(_MaxValue) <= 0 && criterionValue.CompareTo(_MinValue) >= 0;
        }
    }
}
