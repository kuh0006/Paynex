using MM.Entities.Validators;

namespace MM.Services.DTOs.Merchant
{
    public class MerchantFilterDto
    {
        public string? Name { get; set; }


        [CategoryValidation]
        public string? Category { get; set; }
    }
}
