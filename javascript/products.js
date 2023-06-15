class Producto {
  constructor(nombre, precio, imagenURL,id) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.id = id
  }
}

const productos = [
  new Producto("Box Engasse", 10000, "./img/boxengasse.png", 1),
  new Producto("Kock Nap", 10000, "./img/knocknap.png", 2,),
  new Producto("La Night", 10000, "./img/lanight.png", 3,),
  new Producto("Midmix", 10000, "./img/midmix.png", 4,),
  new Producto("Sideral Blue", 10000, "./img/sideralblue.png", 5),
  new Producto("Skin Glam", 10000, "./img/skinglam.png", 6),
];

