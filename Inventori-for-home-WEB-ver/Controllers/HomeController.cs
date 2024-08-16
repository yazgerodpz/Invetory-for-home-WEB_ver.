using System.Diagnostics;
using Inventori_for_home_WEB_ver_.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventori_for_home_WEB_ver_.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        //crear las vistas principales
        //Inventario
        public IActionResult Inventario()
        {
            return View();
        }

        //Reglas de prioridad
        public IActionResult Reglasdeprioridad()
        {
            return View();
        }

        //Tipos de empaques
        public IActionResult Empaques()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
