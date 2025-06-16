using Microsoft.OpenApi.Models;

namespace MM.Api.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddOpenApi(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Merchant API",
                    Version = "v1",
                    Description = "API for managing merchants"
                });
            });

            return services;
        }

        public static WebApplication MapOpenApi(this WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Merchant API V1");
                c.RoutePrefix = string.Empty; // Swagger UI bude na root: https://localhost:xxxx/
            });

            return app;
        }
    }
}
