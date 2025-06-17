namespace MM.Entities.Filters.Base
{
    /// <summary>
    /// A criterion is a rule or principle on which to base a judgment or decision.
    /// </summary>
    /// <typeparam name="T"> T is type of object to be returned.</typeparam>
    /// <typeparam name="V"> V is object which I want to evaluate.</typeparam>
    public class Criterion<T, V>
    {
        public virtual T Evaluate(V @object) { return default!; }
    }
}
