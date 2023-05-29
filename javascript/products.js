class Producto {
  constructor(nombre, precio, imagenURL, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.cantidad = cantidad;
  }
}

const productos = [
  new Producto("Box Engasse", 10000, "./img/boxengasse.png", 5),
  new Producto("Kock Nap", 10000, "./img/knocknap.png", 5),
  new Producto("La Night", 10000, "./img/lanight.png", 5),
  new Producto("Midmix", 10000, "./img/midmix.png", 5),
  new Producto("Sideral Blue", 10000, "./img/sideralblue.png", 5),
  new Producto("Skin Glam", 10000, "./img/skinglam.png", 5),
];

function actualizarInterfaz() {
  const productosContainer = document.getElementById("productosContainer");
  productosContainer.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const imagen = document.createElement("img");
    imagen.src = producto.imagenURL;
    card.appendChild(imagen);

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

    const cantidad = document.createElement("p");
    cantidad.className = "quantity";
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    card.appendChild(cantidad);

    buyButton.addEventListener("click", () => {
      if (producto.cantidad > 0) {
        producto.cantidad--;
        cantidad.textContent = `Cantidad: ${producto.cantidad}`;
        guardarProducto(producto);
      }
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

function recuperarProductosGuardados() {
  const productosGuardados =
    JSON.parse(localStorage.getItem("productosGuardados")) || [];
  productosGuardados.forEach((producto) => {
    console.log("Producto guardado:", producto);
  });
}

actualizarInterfaz();
recuperarProductosGuardados();
