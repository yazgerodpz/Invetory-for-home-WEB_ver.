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

        [HttpGet]
        public JsonResult ReadInvById(int id)
        {
            var QrysResult = _context.Items.Find(id);

           
                // Devolver la respuesta con el nuevo Item y su relación con CatTypeStock
                return new JsonResult(new { Success = true, Data = QrysResult });
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

        [HttpPost]
        public JsonResult EditarInv([FromBody] Item actItem)
        {

            Item editarArt = new()
            {
                IdItem = actItem.IdItem,  // Se asigna automáticamente al guardar
                ItemName = actItem.ItemName,  // Utilizamos el nombre del ítem como el nombre del stock
                Stock = actItem.Stock,
                IdTypePrioritary = actItem.IdTypePrioritary,
                //TypePrioritaryName = nuevoItem.TypePrioritaryName,
                IdTypeStock = actItem.IdTypeStock,
                //TypeStockName = nuevoItem.TypeStockName,
                PurchesDate = actItem.PurchesDate,
                ExpirationDate = actItem.ExpirationDate,
                Active = actItem.Active  // Utilizamos el estado activo del ítem
            };

            // Guardar el nuevo Item en la base de datos
            _context.Items.Update(editarArt);
            _context.SaveChanges();

            // Devolver la respuesta con el nuevo Item y su relación con CatTypeStock
            return new JsonResult(new { Success = true, Data = editarArt });
        }

        //GET: InventarioController/Delete
        [HttpGet]
        public JsonResult DeleteArt(int id)
        {
            //Obtener el elemento
            var QrysResult = _context.Items.Find(id);
            //Validar que existe
            if (QrysResult != null)
            {
                //eliminar el elemento
                _context.Items.Remove(QrysResult);
                //salvar cambios
                _context.SaveChanges();
                // Devolver ok
                return new JsonResult(new { Success = true, Data = string.Empty });
            }
            else
            {
                return new JsonResult(new { Success = false, Data = "Error: El elemento a borrar no existe." });
            }

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
