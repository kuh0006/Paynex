using Microsoft.Extensions.DependencyInjection;
using MM.Services.Implementations;
using MM.Services.Interfaces;
using System.Reflection;

namespace MM.Services.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            // Registration of AutoMapper with automatic profile discovery in MM.Services assembly
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddScoped<IMerchantService, MerchantService>();

            return services;
        }
    }
}
