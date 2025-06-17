using MM.Entities.Filters.Base;
using MM.Entities.Models;

namespace MM.Entities.Filters.CriterionMerchant
{
    public class MerchantCriterion<T> : Criterion<T, Merchant> { }

    public class MerchantNameCriterion : MerchantCriterion<string>
    {
        public override string Evaluate(Merchant @object) => @object.Name;
    }

    public class MerchantCategoryCriterion : MerchantCriterion<string>
    {
        public override string Evaluate(Merchant @object) => @object.Category;
    }
}
