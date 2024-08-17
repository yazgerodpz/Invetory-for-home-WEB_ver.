using Microsoft.EntityFrameworkCore;

namespace Inventori_for_home_WEB_ver_.Models
{
    public partial class InventoryForHomeContext : DbContext
    {
        public virtual DbSet<StoredProcedure1> StoredProcedure1s { get; set; }
        public virtual DbSet<StoredProcedure2> StoredProcedure2s { get; set; }
        public virtual DbSet<StoredProcedure3> StoredProcedure3s { get; set; }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StoredProcedure1>(entity =>
            {
                entity.HasKey(e => e.IdItem);
                entity.Property(e => e.ItemName);
                entity.Property(e => e.Stock);
                entity.Property(e => e.TypePrioritaryName);
                entity.Property(e => e.TypeStockName);
                entity.Property(e => e.PurchesDate);
                entity.Property(e => e.ExpirationDate);
            }
            );
            modelBuilder.Entity<StoredProcedure3>(entity =>
            {
                entity.HasKey(e => e.IdTypeStock);
                entity.Property(e => e.TypeStockName);
            }
            );
            modelBuilder.Entity<StoredProcedure2>(entity =>
            {
                entity.HasKey(e => e.IdTypePrioritary);
                entity.Property(e => e.TypePrioritaryName);
                entity.Property(e => e.Description);
            }
           );
        }
    }
}
