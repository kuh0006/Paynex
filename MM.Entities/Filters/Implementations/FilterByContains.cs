using MM.Entities.Filters.Base;

namespace MM.Entities.Filters.Implementations
{
    /// <summary>
    /// Filter for checking if a string property contains a specified substring.
    /// </summary>
    /// <typeparam name="T">Entity type</typeparam>
    public class FilterByContains<T> : CriteriaFilter<T, string> where T : class
    {
        protected string _value { get; set; }

        public FilterByContains(Criterion<string, T> criterion, string value) : base(criterion)
        {
            _value = value;
        }

        public override bool IsSatisfiedBy(T entity) => _criterion.Evaluate(entity)?.Contains(_value, StringComparison.OrdinalIgnoreCase) ?? false;
    }
}
