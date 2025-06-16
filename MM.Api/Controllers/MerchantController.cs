using Microsoft.AspNetCore.Mvc;

namespace MM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MerchantController : ControllerBase
    {
        private readonly ILogger _logger;

        public MerchantController(ILogger<MerchantController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // get all merchants
        [HttpGet("all")]
        public IActionResult GetAllMerchants()
        {
            _logger.LogInformation("GetAllMerchants called");
            // Here you would typically call a service to get all merchants
            // For now, we return a placeholder response
            return Ok(new { Message = "All merchants retrieved successfully." });
        }

        // get merchant by id 
        [HttpGet("detail/{id}")]
        public IActionResult GetMerchantById(int id)
        {
            _logger.LogInformation("GetMerchantById called for ID: {Id}", id);
            // Here you would typically call a service to get the merchant by ID
            // For now, we return a placeholder response
            return Ok(new { Message = $"Merchant details for ID {id} retrieved successfully." });
        }

        //get merchant by name 
        [HttpGet("detail/name/{name}")]
        public IActionResult GetMerchantByName(string name)
        {
            _logger.LogInformation("GetMerchantByName called for Name: {Name}", name);
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
