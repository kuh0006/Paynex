using MM.Repository.Extensions;
using MM.Services.Extensions;
using MM.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRepositoryServices(builder.Configuration);
builder.Services.AddBusinessServices();

builder.Services.AddControllers();
SwaggerServiceExtensions.AddOpenApi(builder.Services);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAngularClient");
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
