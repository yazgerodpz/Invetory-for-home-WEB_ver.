using Inventori_for_home_WEB_ver_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventori_for_home_WEB_ver_.Controllers
{
    public class PrioridadesController : Controller
    {
        //Tiene uqe tener una instancia privada del db context
        private InventoryForHomeContext _context;

        //COnstructor o funciono de incializacion que instancie el db context
        public PrioridadesController(InventoryForHomeContext inventoryForHomeContext)
        {
            _context = inventoryForHomeContext;
        }

        // GET: PrioridadesController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PrioridadesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PrioridadesController/Create
        public ActionResult Create()
        {
            return View();
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


        // GET: PrioridadesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PrioridadesController/Edit/5
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
