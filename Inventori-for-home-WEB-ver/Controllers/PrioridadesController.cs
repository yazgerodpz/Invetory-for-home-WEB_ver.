using Inventori_for_home_WEB_ver_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventori_for_home_WEB_ver_.Controllers
{
    public class PrioridadesController : Controller
    {
        //Tiene que tener una instancia privada del db context
        private InventoryForHomeContext _context;

        //COnstructor o funciono de incializacion que instancie el db context
        public PrioridadesController(InventoryForHomeContext inventoryForHomeContext)
        {
            _context = inventoryForHomeContext;
        }

        

        // POST: PrioridadesController/CrearPrio
        [HttpPost]
        public JsonResult CrearPrio([FromBody] CatTypePrioritary nuevoReglaPrio)
        {
            CatTypePrioritary nuevoReglaPriority = new()
            {
                IdTypePrioritary = 0,  // Asigna un ID nuevo si es necesario.
                TypePrioritaryName = nuevoReglaPrio.TypePrioritaryName,  // Utiliza el nombre del objeto recibido.
                _Description = nuevoReglaPrio._Description,
                Active = true,  // Utiliza el estado activo del objeto recibido.
            };

            _context.CatTypePrioritaries.Add(nuevoReglaPriority);
            _context.SaveChanges();

            return new JsonResult(new { Success = true, Data = nuevoReglaPriority });
        }

        [HttpGet]
        public JsonResult ReadPrios()
        {
            var QrysResult = _context.CatTypePrioritaries.ToList();
            return new JsonResult(new { Success = true, Data = QrysResult });
        }

        [HttpGet]
        public JsonResult ReadPrioById(int id)
        {
            var QrysResult = _context.CatTypePrioritaries.Find(id);

            return new JsonResult(new { Success = true, Data = QrysResult });
        }


        // GET: PrioridadesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // GET: PrioridadesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PrioridadesController/Delete/5
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
