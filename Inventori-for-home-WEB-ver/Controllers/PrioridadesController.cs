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

        [HttpPost]
        public JsonResult EditPrio([FromBody] CatTypePrioritary ActReglaPrio)
        {
            CatTypePrioritary editarReglaP = new()
            {
                IdTypePrioritary = ActReglaPrio.IdTypePrioritary,  // Asigna un ID nuevo si es necesario.
                TypePrioritaryName = ActReglaPrio.TypePrioritaryName,  // Utiliza el nombre del objeto recibido.
                _Description = ActReglaPrio._Description,
                Active = true,  // Utiliza el estado activo del objeto recibido.
            };

            _context.CatTypePrioritaries.Update(editarReglaP);
            _context.SaveChanges();

            return new JsonResult(new { Success = true, Data = editarReglaP });
        }

        // GET PrioridadesController/Delete
        [HttpGet]
        public JsonResult DeletePrio(int id)
        {
            //Variable para obtener el elemento
            var QrysResult = _context.CatTypePrioritaries.Find(id);
            //verificar (validar) que existe
            if (QrysResult != null)
            {
                //Eliminar el elemento de la tabla
                _context.CatTypePrioritaries.Remove(QrysResult);
                //Guardar cambios
                _context.SaveChanges();
                //Regresar ok
                return new JsonResult(new { Success = true, Data = string.Empty });

            }
            else
            {
                return new JsonResult(new { Success = false, Data = "Error: El elemento a borrar no existe." });
            }
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
