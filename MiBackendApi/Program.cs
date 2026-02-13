using Microsoft.EntityFrameworkCore;
using MiBackendApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Configurar SQL Server para hosting
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? "Server=SQL8005.site4now.net;Database=db_aa8c3c_lumina;User Id=db_aa8c3c_lumina_admin;Password=TuPassword;";

builder.Services.AddDbContext<MiDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar CORS para permitir todos los orígenes (en producción ajusta esto)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddControllers();

var app = builder.Build();

// IMPORTANTE: Servir archivos estáticos de Angular
app.UseDefaultFiles(); // Esto busca index.html
app.UseStaticFiles();  // Esto sirve archivos estáticos

app.UseCors("AllowAll");
app.MapControllers();

// Ruta por defecto redirige a Angular
app.MapFallbackToFile("index.html");

app.Run();