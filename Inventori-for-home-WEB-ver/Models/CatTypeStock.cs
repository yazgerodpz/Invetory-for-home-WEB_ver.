using System;
using System.Collections.Generic;

namespace Inventori_for_home_WEB_ver_.Models;

public partial class CatTypeStock
{
    public int IdTypeStock { get; set; }

    public string TypeStockName { get; set; } = null!;

    public bool Active { get; set; }
}
