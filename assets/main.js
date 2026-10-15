(function () {
  var y = document.getElementById("anio");
  if (y) y.textContent = new Date().getFullYear();

  var t = document.querySelector(".nav-toggle");
  var m = document.getElementById("menu");
  if (t && m) {
    t.addEventListener("click", function () {
      var abierto = m.classList.toggle("open");
      t.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  var lista = document.getElementById("demo-lista");
  var btn = document.getElementById("demo-btn");
  if (lista && btn) {
    var filas = Array.prototype.slice.call(lista.querySelectorAll("li"));
    var timers = [];
    var reiniciar = function () {
      timers.forEach(clearTimeout); timers = [];
      filas.forEach(function (li) {
        li.classList.remove("ok");
        li.querySelector(".estado").textContent = btn.dataset.unassigned || "Sin asignar";
      });
      btn.textContent = btn.dataset.run || "Conciliar pagos";
      btn.dataset.estado = "";
    };
    var conciliar = function () {
      btn.disabled = true;
      filas.forEach(function (li, i) {
        timers.push(setTimeout(function () {
          var e = li.querySelector(".estado");
          li.classList.add("ok");
          e.textContent = (btn.dataset.done || "Conciliado: ") + e.dataset.destino;
          if (i === filas.length - 1) {
            btn.disabled = false;
            btn.textContent = btn.dataset.reset || "Reiniciar demo";
            btn.dataset.estado = "listo";
          }
        }, 450 * (i + 1)));
      });
    };
    btn.addEventListener("click", function () {
      if (btn.dataset.estado === "listo") reiniciar(); else conciliar();
    });
  }
})();
