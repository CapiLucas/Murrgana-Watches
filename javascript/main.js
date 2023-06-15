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
  productosGuardados.push(producto);
  localStorage.setItem(
    "productosGuardados",
    JSON.stringify(productosGuardados)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const showCarrito = document.getElementById("mostrar-carrito");
  const btnCarrito = document.getElementById("btn");
  btnCarrito.addEventListener("click", () => {
    if (showCarrito.style.display != "none") {
      showCarrito.style.display = "none";
    } else {
      showCarrito.style.display = "block";
    }
  });

  function eliminarProducto(id) {
    let carritoStorage = localStorage.getItem("productosGuardados");
    if (carritoStorage) {
      let carrito = JSON.parse(carritoStorage);
      const index = carrito.findIndex((producto) => producto.id === id);
      if (index !== -1) {
        carrito.splice(index, 1); // Eliminar el producto del carrito
        localStorage.setItem("productosGuardados", JSON.stringify(carrito));
      }
    }
    location.reload();
  }

  let carrito = [];
  let preciosjuntos = [];
  let carritoStorage = localStorage.getItem("productosGuardados");
  if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
  }

  carrito.forEach((producto) => {
    let div = document.createElement("div");
    div.className = "compras";
    div.innerHTML = `
      <h2>Nombre: ${producto.nombre}</h2>
      <div>
        <img class="compras-img" src="${producto.imagenURL}" alt="Imagen del producto">
        <button class="erase" data-id="${producto.id}">borrar</button>
      </div>
      <p>Precio: ${producto.precio}</p>
    `;
    showCarrito.appendChild(div);
    preciosjuntos.push(producto.precio);

    // Agregar event listener al botón de borrar
    const borrarButton = div.querySelector(".erase");
    borrarButton.addEventListener("click", () => {
      eliminarProducto(producto.id);
      div.remove(); // Eliminar la fila del producto del DOM
    });
  });

  let total = preciosjuntos.reduce((a, b) => a + b, 0);

  let totaldiv = document.createElement("div");
  totaldiv.className = "total";
  totaldiv.innerHTML = `
  <p>Total: ${total}</p>
  `;
  showCarrito.appendChild(totaldiv);

  recuperarProductosGuardados();
});

function recuperarProductosGuardados() {
  const productosGuardados =
    JSON.parse(localStorage.getItem("productosGuardados")) || [];
  productosGuardados.forEach((producto) => {
    console.log("Producto guardado:", producto);
  });
}

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

actualizarInterfaz();
