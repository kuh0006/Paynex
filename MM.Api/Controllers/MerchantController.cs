using Microsoft.AspNetCore.Mvc;
using MM.Entities.DTOs.Merchant;
using MM.Services.Interfaces;

namespace MM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MerchantController : ControllerBase
    {
        private readonly IMerchantService _merchantService;
        private readonly ILogger _logger;

        public MerchantController(ILogger<MerchantController> logger, IMerchantService merchantService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _merchantService = merchantService ?? throw new ArgumentNullException(nameof(merchantService));
        }

        [HttpGet("all")]
        public async IActionResult GetAllMerchants()
        {
            _logger.LogInformation("GetAllMerchants called");

            IEnumerable<MerchantReadDto> merchants =  await _merchantService.GetAllAsync();


        }

        [HttpGet("{id}")]
        public IActionResult GetMerchantById([FromRoute] int id)
        {
            _logger.LogInformation("GetMerchantById called for ID: {Id}", id);
            // Here you would typically call a service to get the merchant by ID
            // For now, we return a placeholder response
            return Ok(new { Message = $"Merchant details for ID {id} retrieved successfully." });
        }

        //get merchant by name 
        [HttpGet("name/{name}")]
        public IActionResult GetMerchantsByName(string name)
        {
            _logger.LogInformation("GetMerchantsByName called for Name: {Name}", name);
            // Here you would typically call a service to get the merchant by name
            // For now, we return a placeholder response
            return Ok(new { Message = $"Merchant details for Name {name} retrieved successfully." });
        }

        // update merchant by id
        [HttpPut("update/{id}")]
        public IActionResult UpdateMerchant(int id, [FromBody] object merchantUpdate)
        {
            _logger.LogInformation("UpdateMerchant called for ID: {Id}", id);
            // Here you would typically call a service to update the merchant
            // For now, we return a placeholder response
            return Ok(new { Message = $"Merchant with ID {id} updated successfully." });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteMerchant(int id)
        {
            _logger.LogInformation("DeleteMerchant called for ID: {Id}", id);
            // Here you would typically call a service to delete the merchant
            // For now, we return a placeholder response
            return Ok(new { Message = "Merchant deleted successfully." });
        }

    }
}
