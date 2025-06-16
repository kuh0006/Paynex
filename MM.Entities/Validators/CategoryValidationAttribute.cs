using System.ComponentModel.DataAnnotations;

namespace MM.Entities.Validators
{
    public class CategoryValidationAttribute : ValidationAttribute
    {
        private static readonly string[] Allowed = { "Retail", "Food", "Services" };

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string str && Allowed.Contains(str))
                return ValidationResult.Success;

            return new ValidationResult($"Category must be one of: {string.Join(", ", Allowed)}");
        }
    }
}
