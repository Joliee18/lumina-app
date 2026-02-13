using Microsoft.EntityFrameworkCore;
using MiBackendApi.Models;

namespace MiBackendApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Mensaje> Mensajes { get; set; } // Esto creará la tabla 'Mensajes'
}