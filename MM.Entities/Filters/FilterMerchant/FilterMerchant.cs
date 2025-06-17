using MM.Entities.Models;
using MM.Entities.Filters.Base;
using MM.Entities.Filters.Implementations;

namespace MM.Entities.Filters.FilterMerchant
{
    public class FilterMerchantNameContains : FilterByContains<Merchant>
    {
        public FilterMerchantNameContains(Criterion<string, Merchant> criterion, string value) : base(criterion, value)
        {
        }
    }

    public class FilterMerchantName : FilterByValue<Merchant, string>
    {
        public FilterMerchantName(Criterion<string, Merchant> criterion, string value) : base(criterion, value) { }
    }

    public class FilterMerchantCategory : FilterByValue<Merchant, string>
    {
        public FilterMerchantCategory(Criterion<string, Merchant> criterion, string value) : base(criterion, value) { }
    }
}
