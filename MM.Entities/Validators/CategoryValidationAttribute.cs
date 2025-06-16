using System.ComponentModel.DataAnnotations;

namespace MM.Entities.Validators
{
    public class CategoryValidationAttribute : ValidationAttribute
    {
        private static readonly string[] Allowed = { "Retail", "Food", "Services" };

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string str && Allowed.Any(a => string.Equals(a, str, StringComparison.OrdinalIgnoreCase)))
                return ValidationResult.Success;

            return new ValidationResult($"Category must be one of: {string.Join(", ", Allowed)}");
        }
    }
}
