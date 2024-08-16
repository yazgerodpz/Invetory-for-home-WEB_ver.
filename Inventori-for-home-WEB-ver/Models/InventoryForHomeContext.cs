using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Inventori_for_home_WEB_ver_.Models;

public partial class InventoryForHomeContext : DbContext
{
    public InventoryForHomeContext()
    {
    }

    public InventoryForHomeContext(DbContextOptions<InventoryForHomeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CatTypePrioritary> CatTypePrioritaries { get; set; }

    public virtual DbSet<CatTypeStock> CatTypeStocks { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-IMJ2A1A; Database=InventoryForHome; User Id=yazryr; Password=12345678; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CatTypePrioritary>(entity =>
        {
            entity.HasKey(e => e.IdTypePrioritary);

            entity.ToTable("CatTypePrioritary");
        });

        modelBuilder.Entity<CatTypeStock>(entity =>
        {
            entity.HasKey(e => e.IdTypeStock);

            entity.ToTable("CatTypeStock");
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.IdItem);

            entity.ToTable("Item");

            entity.Property(e => e.ExpirationDate).HasColumnType("datetime");
            entity.Property(e => e.PurchesDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
