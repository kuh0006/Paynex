using MM.Repository.Extensions;
using MM.Services.Extensions;
using MM.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRepositoryServices(builder.Configuration);
builder.Services.AddBusinessServices();

builder.Services.AddControllers();
SwaggerServiceExtensions.AddOpenApi(builder.Services);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
