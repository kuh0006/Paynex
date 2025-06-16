using Microsoft.AspNetCore.Http;

namespace MM.Services.Common
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
        public int Status { get; set; }

        // Empty constructor for serialization or manual population
        public ApiResponse() { }

        // Full constructor (private - use static methods for clarity)
        private ApiResponse(T? data, string message, bool success, int status)
        {
            Data = data;
            Message = message;
            Success = success;
            Status = status;
        }

        // Success response
        public static ApiResponse<T> SuccessResponse(T data, string message = "Request successful", int status = StatusCodes.Status200OK)
        {
            return new ApiResponse<T>(data, message, true, status);
        }

        // No content / empty success
        public static ApiResponse<T> EmptyResponse(string message = "No content", int status = StatusCodes.Status204NoContent)
        {
            return new ApiResponse<T>(default, message, true, status);
        }

        // Failure response
        public static ApiResponse<T> FailResponse(string message, int status = StatusCodes.Status400BadRequest)
        {
            return new ApiResponse<T>(default, message, false, status);
        }

        // Not found (semantic clarity)
        public static ApiResponse<T> NotFound(string message = "Resource not found")
        {
            return new ApiResponse<T>(default, message, false, StatusCodes.Status404NotFound);
        }

        // Internal error (semantic clarity)
        public static ApiResponse<T> Error(string message = "An unexpected error occurred")
        {
            return new ApiResponse<T>(default, message, false, StatusCodes.Status500InternalServerError);
        }
    }
}
