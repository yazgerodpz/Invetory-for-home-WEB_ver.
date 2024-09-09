using Inventori_for_home_WEB_ver_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventori_for_home_WEB_ver_.Controllers
{
    public class InventarioController : Controller
    {
        private InventoryForHomeContext _context;

        //COnstructor o funciono de incializacion que instancie el db context
        public InventarioController(InventoryForHomeContext inventoryForHomeContext)
        {
            _context = inventoryForHomeContext;
        }

       


        [HttpGet]
        public JsonResult ReadInvs()
        {
            var QrysResult = _context.Items.ToList();
            var query = from item in _context.Items
                        join typePrioritary in _context.CatTypePrioritaries
                            on item.IdTypePrioritary equals typePrioritary.IdTypePrioritary
                        join typeStock in _context.CatTypeStocks
                            on item.IdTypeStock equals typeStock.IdTypeStock
                        where item.Active == true
                        select new StoredProcedure1
                        {
                            IdItem = item.IdItem,
                            ItemName = item.ItemName,
                            Stock = item.Stock,
                            TypePrioritaryName = typePrioritary.TypePrioritaryName,
                            TypeStockName = typeStock.TypeStockName,
                            PurchesDate = item.PurchesDate,
                            ExpirationDate = item.ExpirationDate
                        };

            var result = query.ToList(); // Retorna el primer resultado o null si no lo encuentra

            // Devolver la respuesta con el nuevo Item y su relación con CatTypeStock
            return new JsonResult(new { Success = true, Data = result });
        }

        // GET: InventarioController
        public ActionResult Index()
        {
            return View();
        }

        // GET: InventarioController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: InventarioController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: InventarioController/CrearInv
        [HttpPost]
        public JsonResult CrearInv([FromBody] Item nuevoItem)
        {
            
            Item nuevoArt = new()
            {
                IdItem = 0,  // Se asigna automáticamente al guardar
                ItemName = nuevoItem.ItemName,  // Utilizamos el nombre del ítem como el nombre del stock
                Stock = nuevoItem.Stock,
                IdTypePrioritary = nuevoItem.IdTypePrioritary,
                //TypePrioritaryName = nuevoItem.TypePrioritaryName,
                IdTypeStock = nuevoItem.IdTypeStock,
                //TypeStockName = nuevoItem.TypeStockName,
                PurchesDate = nuevoItem.PurchesDate,
                ExpirationDate = nuevoItem.ExpirationDate,
                Active = nuevoItem.Active  // Utilizamos el estado activo del ítem
            };

            //nuevoItem.IdTypePrioritary = TypePrioritaryName,
            //nuevoItem.IdTypeStock = TypeStockName;

            // Guardar el nuevo Item en la base de datos
            _context.Items.Add(nuevoItem);
            _context.SaveChanges();

            //Crear objeto de regreso:

            var query = from item in _context.Items
                        join typePrioritary in _context.CatTypePrioritaries
                            on item.IdTypePrioritary equals typePrioritary.IdTypePrioritary
                        join typeStock in _context.CatTypeStocks
                            on item.IdTypeStock equals typeStock.IdTypeStock
                        where item.Active == true && item.IdItem == nuevoItem.IdItem
                        select new StoredProcedure1
                        {
                            IdItem = item.IdItem,
                            ItemName = item.ItemName,
                            Stock = item.Stock,
                            TypePrioritaryName = typePrioritary.TypePrioritaryName,
                            TypeStockName = typeStock.TypeStockName,
                            PurchesDate = item.PurchesDate,
                            ExpirationDate = item.ExpirationDate
                        };

            var result = query.FirstOrDefault(); // Retorna el primer resultado o null si no lo encuentra

            // Devolver la respuesta con el nuevo Item y su relación con CatTypeStock
            return new JsonResult(new { Success = true, Data = result });
        }


        // GET: InventarioController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: InventarioController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: InventarioController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: InventarioController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
