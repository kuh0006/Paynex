using MM.Entities.Validators;
using System.ComponentModel.DataAnnotations;

namespace MM.Entities.DTOs.Merchant
{
    public class MerchantUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [CategoryValidation]
        public string Category { get; set; } = string.Empty;
    }
}
