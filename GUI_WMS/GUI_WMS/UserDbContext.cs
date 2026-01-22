using Microsoft.EntityFrameworkCore;

namespace GUI_WMS
{
    public class UserDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Define the SQLite connection string
            optionsBuilder.UseSqlite("Data Source=DataFile.db"); // Will create the DB file in the project directory
        }

        public DbSet<User> Users { get; set; }
    }
}
