namespace MiBackendApi.Models;

public class Mensaje
{
    public int Id { get; set; } // SQL lo hará Auto-incremental
    public string Contenido { get; set; } = string.Empty;
    public DateTime Fecha { get; set; } = DateTime.Now;
}