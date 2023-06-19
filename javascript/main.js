function actualizarInterfaz() {
  const productosContainer = document.getElementById("productosContainer");
  productosContainer.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const imagen = document.createElement("img");
    imagen.src = producto.imagenURL;
    imagen.setAttribute("data-id", producto.id);
    card.appendChild(imagen);

    imagen.addEventListener("click", () => {
      window.location.href = `modelo.html?id=${producto.id}`;
    });

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;
    card.appendChild(nombre);

    const precio = document.createElement("p");
    precio.textContent = `$ ${producto.precio}`;
    card.appendChild(precio);

    const buyButton = document.createElement("a");
    buyButton.href = "#";
    buyButton.className = "buy-button";
    buyButton.textContent = "Comprar";
    card.appendChild(buyButton);

    buyButton.addEventListener("click", () => {
      guardarProducto(producto);
      location.reload();
    });
    productosContainer.appendChild(card);
  });
}

function guardarProducto(producto) {
  const productosGuardados =
    JSON.parse(localStorage.getItem("productosGuardados")) || [];
  const productoExistente = productosGuardados.find(
    (p) => p.id === producto.id
  );

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    producto.cantidad = 1;
    productosGuardados.push(producto);
  }

  localStorage.setItem(
    "productosGuardados",
    JSON.stringify(productosGuardados)
  );
  actualizarInterfaz();
}

function recuperarProductosGuardados() {
  const productosGuardados =
    JSON.parse(localStorage.getItem("productosGuardados")) || [];
  productosGuardados.forEach((producto) => {
    console.log("Producto guardado:", producto);
  });
}

recuperarProductosGuardados();

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = productos.find(
    (producto) => producto.id === parseInt(productId)
  );

  if (product) {
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
      <h1>${product.nombre}</h1>
      <div class="topdiv"><img src="${product.imagenURL}" alt="Imagen del producto"> <p>El reloj ${product.nombre} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed augue elementum, scelerisque diam aliquet, commodo enim. Aliquam mattis urna quis nibh condimentum lacinia. Quisque lobortis nulla quis velit posuere, eu tincidunt eros vulputate. Curabitur ac nulla at dui euismod gravida. In lobortis sollicitudin aliquet. Nam vitae ex eu nibh tincidunt rutrum vel ac turpis. Sed congue ut nibh ac lobortis. Donec blandit convallis lectus, in vulputate orci efficitur in. Nullam nibh arcu, porta in tincidunt ut, tincidunt eu quam. Ut dictum nibh sit amet gravida condimentum. Pellentesque suscipit ex id dui tincidunt euismod. Nam pellentesque fermentum porta. Nulla risus magna, tincidunt ac ullamcorper nec, efficitur at enim.
      consequat est tortor. Sed ut blandit lacus.</p></div>
      <div class="bottomdiv"><p>$${product.precio}</p> <a href="#" class="buy-button">COMPRAR</a></div>
    `;
  }
});

const carritobtn = document.getElementById("boton");
const carrito = document.getElementById("modal-container");
const overlay = document.getElementById("overlay");
const productosGuardados =
  JSON.parse(localStorage.getItem("productosGuardados")) || [];

carritobtn.addEventListener("click", function () {
  carrito.style.display = "flex";
  overlay.style.display = "block";

  carrito.innerHTML = "";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    <a href="index.html"> <i class="fa-regular fa-circle-xmark"></i></a>
  `;
  carrito.appendChild(modalHeader);

  productosGuardados.forEach((producto) => {
    let carritocontent = document.createElement("div");
    carritocontent.className = "watches";
    carritocontent.innerHTML = `
      <h1>${producto.nombre}</h1>
      <img class="img-sell" src=${producto.imagenURL}></img>
      <p>precio:$${producto.precio}</p>
      <p>cant:${producto.cantidad}</p>
    `;
    carrito.appendChild(carritocontent);
  });

  let modelFooter = document.createElement("div");
  modelFooter.className = "botones";
  modelFooter.innerHTML = `
    <button class="boton1">Limpiar Carrito</button>
    <button class="boton2">Comprar</button>
    `;
  carrito.appendChild(modelFooter);

  const boton1 = document.getElementsByClassName("boton1")[0];
  boton1.addEventListener("click", function () {
    localStorage.clear();
    actualizarInterfaz();
    location.reload();
  });

  const boton2 = document.getElementsByClassName("Boton2")[0];
  boton2.addEventListener("click", function () {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas borrar los datos del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire(
          "Borrado",
          "Los datos del carrito han sido borrados",
          "success"
        );
        // Actualizar la interfaz después de borrar el localStorage
        actualizarInterfaz();
      }
    });
  });
});

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    carrito.style.display = "none";
    overlay.style.display = "none";
  }
});
actualizarInterfaz();
