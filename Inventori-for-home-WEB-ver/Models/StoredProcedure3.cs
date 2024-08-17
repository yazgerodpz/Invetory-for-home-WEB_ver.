namespace Inventori_for_home_WEB_ver_.Models
{
    public class StoredProcedure3
    {
        public int IdTypeStock { get; set; }
        public string TypeStockName { get; set; } = null!;


        public override string ToString()
        {
            return $"{TypeStockName}";
        }
    }
}
