using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MM.Contracts;
using MM.Contracts.IMerchant;
using MM.Entities;

namespace MM.Repository.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMemoryCache();

            services.AddDbContext<RepositoryContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Register Repository Wrapper pattern  
            services.AddScoped<IMerchantRepository, MerchantRepository>();
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            services.Decorate<IMerchantRepository, CachedMerchantRepositoryDecorator>();

            return services;
        }
    }
}
