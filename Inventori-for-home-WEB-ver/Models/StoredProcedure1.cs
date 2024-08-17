namespace Inventori_for_home_WEB_ver_.Models
{
    public class StoredProcedure1
    {
        public int IdItem { get; set; }

        public string ItemName { get; set; } = null!;

        public int Stock { get; set; }

        public string TypePrioritaryName { get; set; } = null!;

        public string TypeStockName { get; set; } = null!;

        public DateTime PurchesDate { get; set; }

        public DateTime ExpirationDate { get; set; }
    }

    public class StoredProcedure14Update : StoredProcedure1
    {
        public int IdTypePrioritary { get; set; }
        public int IdTypeStock { get; set; }
    }
}
