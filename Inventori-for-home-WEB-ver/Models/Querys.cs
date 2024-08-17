using Microsoft.EntityFrameworkCore;

namespace Inventori_for_home_WEB_ver_.Models
{
    public class Querys
    {
        //Funcines de crear
        /// <summary>
        /// Funcion de añadir articulo
        /// </summary>
        /// <param name="_NuevoArtículo">Cadena con el nombre</param>
        /// <param name="_numstock">Cantidad</param>
        /// <param name="_TypePN">Tipo de prioridad</param>
        /// <param name="_TypeSN">Tipo de empaque</param>
        /// <param name="_PDate">Fecha de compra</param>
        /// <param name="_EDate">Fecha de expiracion</param>
        /// <returns></returns>
         //Nuevo Articulo
        public static async Task<bool> CrearNArtAsync(string _NuevoArtículo, string _numstock, string _TypePN, string _TypeSN, DateTime _PDate, DateTime _EDate)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {

                    var result = await db.Database.ExecuteSqlAsync($"EXEC OptionMenu 1, {_NuevoArtículo}, {_numstock}, {_TypePN}, {_TypeSN}, {_PDate}, {_EDate}, 1, {null}");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> CrearNStockAsync(string _NuevoStock)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {


                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoStock 1, {null}, {_NuevoStock}, 1");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> CrearNPrioridadAsync(string _NuevaPrioridad, string _DescPrio)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {

                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoPrioridad 1, {null}, {_NuevaPrioridad}, {_DescPrio}, 1");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        //Funciones de visualisación
        public static async Task<List<StoredProcedure1>> ObtenerTablaItemAsync()
        {
            using (var db = new InventoryForHomeContext())
            {
                var StoredProcedure1 = await db.StoredProcedure1s.FromSql($"EXEC OptionMenu 2").ToListAsync();
                return StoredProcedure1;
            }
        }

        //VERSION NO ASINCRONA
        public static List<StoredProcedure1> ObtenerTablaItem()
        {
            using (var db = new InventoryForHomeContext())
            {
                var StoredProcedure1 = db.StoredProcedure1s.FromSql($"EXEC OptionMenu 2").ToList();
                return StoredProcedure1;
            }
        }

        public static async Task<List<StoredProcedure3>> ObtenerTablaStockAsync()
        {
            using (var db = new InventoryForHomeContext())
            {
                var StoredProcedure3 = await db.StoredProcedure3s.FromSql($"EXEC CatalogoStock 2").ToListAsync();
                return StoredProcedure3;
            }
        }

        public static async Task<List<StoredProcedure2>> ObtenerTablaPrioridadAsync()
        {
            using (var db = new InventoryForHomeContext())
            {
                var StoredProcedure2 = await db.StoredProcedure2s.FromSql($"EXEC CatalogoPrioridad 2").ToListAsync();
                return StoredProcedure2;
            }
        }

        //Funciones de actualizar
        public static async Task<bool> ActArtAsync(string _ActName, string _numstock, string _TypePN, string _TypeSN, DateTime _PDate, DateTime _EDate, string _Actualizar)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {

                    var result = await db.Database.ExecuteSqlAsync($"EXEC OptionMenu 3, {_ActName}, {_numstock}, {_TypePN}, {_TypeSN}, {_PDate}, {_EDate}, 1, {_Actualizar}");
                    //await db.Items.FromSql($"EXEC OptionMenu 3, {_ActName}, {_numstock}, {_TypePN}, {_TypeSN}, {_PDate}, {_EDate}, 1, {_Actualizar}").ToListAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> ActStockAsync(string _ActIDStock, string _ActSName)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {
                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoStock 3, {_ActIDStock}, {_ActSName}, 1");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> ActPrioridadAsync(string _ActIDPrioridad, string _ActPrioName, string _ActPrioDesc)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {
                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoPrioridad 3, {_ActIDPrioridad}, {_ActPrioName}, {_ActPrioDesc}");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        //Funciones de eliminar
        public static async Task<bool> ElimArtAsync(string _Eliminar)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {

                    var result = await db.Database.ExecuteSqlAsync($"EXEC OptionMenu 4, {null}, {null}, {null}, {null}, {null}, {null}, {null}, {_Eliminar}");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> ElimStockAsync(string _ElimStock)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {
                    //@CS Int = 0,
                    //@Var_Identidad Int = 0,
                    //@Var_TSName Nvarchar(MAX) = Null,
                    //@Var_Activo Bit = 0
                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoStock 4, {_ElimStock}, {null}, {null}");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static async Task<bool> ElimPrioridadAsync(string _ElimPrioridad)
        {
            try
            {
                using (var db = new InventoryForHomeContext())
                {
                    var result = await db.Database.ExecuteSqlAsync($"EXEC CatalogoPrioridad 4, {_ElimPrioridad}, {null}, {null}");
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        ///SECCION DE QUERYS CON LINQ
        ///
        // Codigo para visualizar la informacion en casillas asignadas
        public static async Task<StoredProcedure14Update?> obtenerItemByIdAsync(int IdItem)
        {
            using (var db = new InventoryForHomeContext())
            {
                //VALIDAR QUE EXISTA ESE ID

                var ValidacionExiste = await db.Items.FirstOrDefaultAsync(I => I.IdItem == IdItem);

                if (ValidacionExiste == null)
                {
                    return null;
                }
                else
                {
                    //BUSCAR EL OBJETO
                    var QryResult = await (from a in db.Items
                                           join b in db.CatTypePrioritaries
                                           on a.IdTypePrioritary equals b.IdTypePrioritary
                                           join c in db.CatTypeStocks
                                           on a.IdTypeStock equals c.IdTypeStock
                                           where a.Active == true
                                           && a.IdItem == IdItem

                                           select new StoredProcedure14Update
                                           {
                                               ItemName = a.ItemName,
                                               Stock = a.Stock,
                                               IdTypePrioritary = a.IdTypePrioritary,
                                               TypePrioritaryName = b.TypePrioritaryName,
                                               IdTypeStock = a.IdTypeStock,
                                               TypeStockName = c.TypeStockName,
                                               PurchesDate = a.PurchesDate,
                                               ExpirationDate = a.ExpirationDate,
                                           }

                                           ).ToListAsync();
                    return QryResult[0];

                }
            }
        }

        public static async Task<StoredProcedure3> obtenerStockByIdAsync(int IdStock)
        {
            using (var db = new InventoryForHomeContext())
            {
                var QryStock = await (from c in db.CatTypeStocks
                                      where c.IdTypeStock == IdStock

                                      select new StoredProcedure3
                                      {
                                          IdTypeStock = c.IdTypeStock,
                                          TypeStockName = c.TypeStockName,
                                      }

                                      ).ToListAsync();



                return QryStock[0];
            }
        }

        public static async Task<StoredProcedure2> obtenerPrioByIdAsync(int IdPrio)
        {
            using (var db = new InventoryForHomeContext())
            {
                var QryPrio = await (from d in db.CatTypePrioritaries
                                     where d.IdTypePrioritary == IdPrio

                                     select new StoredProcedure2
                                     {
                                         IdTypePrioritary = d.IdTypePrioritary,
                                         TypePrioritaryName = d.TypePrioritaryName,
                                         Description = d._Description,
                                     }

                                     ).ToListAsync();



                return QryPrio[0];
            }
        }

        //Traer Catalogos

        public static async Task<List<StoredProcedure2>> obtenerCatalogoPrio()
        {
            using (var db = new InventoryForHomeContext())
            {

                var queryResult = await (from prio in db.CatTypePrioritaries
                                         select new StoredProcedure2
                                         {
                                             IdTypePrioritary = prio.IdTypePrioritary,
                                             TypePrioritaryName = prio.TypePrioritaryName,
                                             Description = prio._Description,
                                         }).ToListAsync();
                return queryResult;
            }
        }

        //traer el catalogo de stock
        public static async Task<List<StoredProcedure3>> obtenerCatalogoStock()
        {
            using (var db = new InventoryForHomeContext())
            {
                var queryRessultStock = await (from emp in db.CatTypeStocks
                                               select new StoredProcedure3
                                               {
                                                   IdTypeStock = emp.IdTypeStock,
                                                   TypeStockName = emp.TypeStockName,
                                               }).ToListAsync();
                return queryRessultStock;
            }
        }

    }
}
