using Inventori_for_home_WEB_ver_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventori_for_home_WEB_ver_.Controllers
{
    //Se crean controladores para las operaciones
    public class EmpaquesController : Controller
    {
        //Tiene uqe tener una instancia privada del db context
        private InventoryForHomeContext _context;

        //COnstructor o funciono de incializacion que instancie el db context
        public EmpaquesController(InventoryForHomeContext inventoryForHomeContext)
        {
            _context = inventoryForHomeContext;
        }

        [HttpGet]
        public JsonResult ReadEmps()
        {
            var QryResult = _context.CatTypeStocks.ToList();
            return new JsonResult(new { Success = true, Data = QryResult });
        }

        //// GET: EmpaquesController
        //public ActionResult Index()
        //{
        //    return View();
        //}

        // GET: EmpaquesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: EmpaquesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: EmpaquesController/CrearEmp
        [HttpPost]
        public JsonResult CrearEmp(string nombreEmpaque)
        {
            CatTypeStock nuevoEmpaque = new()
            {
                IdTypeStock = 0,
                TypeStockName = nombreEmpaque,
                Active = true,
            };

            _context.CatTypeStocks.Add(nuevoEmpaque);
            _context.SaveChanges();
            return new JsonResult(new { Success = true, Data = nuevoEmpaque });
        }

        // GET: EmpaquesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: EmpaquesController/Edit/5
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

        // GET: EmpaquesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: EmpaquesController/Delete/5
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
