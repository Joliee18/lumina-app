using Microsoft.EntityFrameworkCore;
using MiBackendApi.Data;  // ← Usa AppDbContext

var builder = WebApplication.CreateBuilder(args);

// Usar AppDbContext (QUE SÍ EXISTE)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

// Health check
app.MapGet("/health", () => Results.Json(new { 
    status = "healthy", 
    timestamp = DateTime.Now 
}));

app.Run();
