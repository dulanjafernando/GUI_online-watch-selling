using System.ComponentModel.DataAnnotations;

namespace GUI_WMS
{
    public class User
    {
        [Key] // Marks the Id property as the primary key
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? VehicleType { get; set; }

        public string? VehicleNumber { get; set; }

        public string? Duration { get; set; }
    }
}
