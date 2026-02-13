using Microsoft.AspNetCore.Mvc;
using MiBackendApi.Data;
using MiBackendApi.Models;
using Microsoft.EntityFrameworkCore; // <--- Esta es la que falta

namespace MiBackendApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MensajesController : ControllerBase
{
    private readonly AppDbContext _context;

    // Conectamos el controlador con la base de datos
    public MensajesController(AppDbContext context)
    {
        _context = context;
    }   

    [HttpPost]
    public async Task<IActionResult> Guardar(Mensaje nuevo)
    {
        _context.Mensajes.Add(nuevo); // Agrega el dato a la tabla
        await _context.SaveChangesAsync(); // Guarda los cambios en SQL Server
        return Ok(new { mensaje = "¡Dato guardado!" });
    }

    [HttpGet]
public async Task<ActionResult<IEnumerable<Mensaje>>> GetMensajes()
{
    // Esto consulta la tabla 'Mensajes' en tu base de datos de Docker
    return await _context.Mensajes.OrderByDescending(m => m.Fecha).ToListAsync();
}
}