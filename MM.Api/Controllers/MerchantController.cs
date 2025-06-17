using Microsoft.AspNetCore.Mvc;
using MM.Entities.DTOs.Merchant;
using MM.Entities.Filters.Composite;
using MM.Entities.Filters.CriterionMerchant;
using MM.Entities.Filters.FilterMerchant;
using MM.Entities.Models;
using MM.Services.Common;
using MM.Services.DTOs.Merchant;
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
        public async Task<IActionResult> GetAllMerchants()
        {
            _logger.LogInformation("GetAllMerchants called");

            IEnumerable<MerchantReadDto> merchants = await _merchantService.GetAllAsync();

            if (merchants == null || !merchants.Any())
            {
                _logger.LogInformation("No merchants found");
                return NotFound(ApiResponse<MerchantReadDto>.NotFound("Merchant not found."));
            }

            _logger.LogInformation("Retrieved {Count} merchants", merchants.Count());
            return Ok(ApiResponse<IEnumerable<MerchantReadDto>>.SuccessResponse(merchants, "Merchants retrieved successfully."));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMerchantById([FromRoute] int id)
        {
            _logger.LogInformation("GetMerchantById called for ID: {Id}", id);

            MerchantReadDto? merchant = await _merchantService.GetByIdAsync(id);

            if (merchant == null)
            {
                _logger.LogInformation("Merchant with ID: {Id} not found", id);
                return NotFound(ApiResponse<MerchantReadDto>.NotFound("Merchant not found."));
            }

            _logger.LogInformation("Merchant with ID: {Id} retrieved successfully", id);
            return Ok(ApiResponse<MerchantReadDto>.SuccessResponse(merchant, "Merchant retrieved successfully."));
        }

        [HttpPost("filter")]
        public async Task<IActionResult> GetFilteredMerchants([FromBody] MerchantFilterDto filterDto)
        {
            _logger.LogInformation("Filtering merchants by name: {Name}, category: {Category}", filterDto.Name, filterDto.Category);

            CompositeFilter<Merchant> filter = new();

            if (!string.IsNullOrWhiteSpace(filterDto.Name))
                filter.AddFilter(new FilterMerchantNameContains(new MerchantNameCriterion(), filterDto.Name));

            if (!string.IsNullOrWhiteSpace(filterDto.Category))
                filter.AddFilter(new FilterMerchantCategory(new MerchantCategoryCriterion(), filterDto.Category));

            IEnumerable<MerchantReadDto> result = await _merchantService.GetFilteredAsync(filter);

            if (result == null || !result.Any())
            {
                _logger.LogInformation("No merchants found matching the filter criteria");
                return Ok(ApiResponse<IEnumerable<MerchantReadDto>>.NotFound("No matching merchants found."));
            }

            _logger.LogInformation("Filtered merchants retrieved successfully, count: {Count}", result.Count());
            return Ok(ApiResponse<IEnumerable<MerchantReadDto>>.SuccessResponse(result, "Filtered merchants retrieved successfully."));
        }

        // Create a new merchant
        [HttpPost]
        public async Task<IActionResult> CreateMerchant([FromBody] MerchantCreateDto merchantCreate)
        {
            _logger.LogInformation("CreateMerchant called");

            if (merchantCreate == null)
            {
                _logger.LogError("MerchantCreateDto is null");
                return BadRequest(ApiResponse<bool>.FailResponse("Merchant creation data cannot be null."));
            }

            // Create the merchant
            var merchant = await _merchantService.CreateAsync(merchantCreate);

            if (merchant == null)
            {
                _logger.LogError("Failed to create merchant");
                return BadRequest(ApiResponse<Merchant>.FailResponse("Merchant creation failed."));
            }

            _logger.LogInformation("Merchant created successfully with ID: {Id}", merchant.Id);
            return CreatedAtAction(nameof(GetMerchantById), new { id = merchant.Id }, ApiResponse<Merchant>.SuccessResponse(merchant, "Merchant created successfully."));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMerchant([FromRoute] int id, [FromBody] MerchantUpdateDto merchantUpdate)
        {
            _logger.LogInformation("UpdateMerchant called for ID: {Id}", id);

            // Validate the incoming DTO
            if (merchantUpdate == null)
            {
                _logger.LogError("MerchantUpdateDto is null");
                return BadRequest(ApiResponse<Merchant>.FailResponse("Merchant update data cannot be null."));
            }

            if (id <= 0)
            {
                _logger.LogError("Invalid ID: {Id}", id);
                return BadRequest(ApiResponse<Merchant>.FailResponse("Invalid merchant ID."));
            }

            // Ensure the ID in the DTO matches the route parameter
            if (merchantUpdate.Id != id)
            {
                _logger.LogError("ID mismatch: Route ID {RouteId} does not match DTO ID {DtoId}", id, merchantUpdate.Id);
                return BadRequest(ApiResponse<Merchant>.FailResponse("ID in the request body does not match the route ID."));
            }

            _logger.LogInformation("Updating merchant with ID: {Id}", id);
            Merchant? result = await _merchantService.UpdateAsync(merchantUpdate);

            if (result == null)
            {
                _logger.LogError("Failed to update merchant with ID: {Id}", id);
                return NotFound(ApiResponse<Merchant>.NotFound("Merchant not found or update failed."));
            }

            _logger.LogInformation("Merchant with ID: {Id} updated successfully", id);
            return Ok(ApiResponse<Merchant>.SuccessResponse(result, "Merchant updated successfully."));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMerchant(int id)
        {
            _logger.LogInformation("DeleteMerchant called for ID: {Id}", id);

            if (id <= 0)
            {
                _logger.LogError("Invalid ID: {Id}", id);
                return BadRequest(ApiResponse<bool>.FailResponse("Invalid merchant ID."));
            }

            bool result = await _merchantService.DeleteAsync(id);

            if (!result)
            {
                _logger.LogError("Failed to delete merchant with ID: {Id}", id);
                return NotFound(ApiResponse<bool>.NotFound("Merchant not found or deletion failed."));
            }

            _logger.LogInformation("Merchant with ID: {Id} deleted successfully", id);
            return Ok(ApiResponse<bool>.SuccessResponse(true, "Merchant deleted successfully."));
        }
    }
}
