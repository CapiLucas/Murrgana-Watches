const btnjs = document.getElementById('botonjs');

btnjs.addEventListener("click", () => {
  Swal.fire({
    title: "Gracias por comprar!",
    text: "Se le enviará un email con la información del producto",
    icon: "success",
    confirmButtonText: "Bien",
  }).then((result) => {
    localStorage.clear();
  });

  actualizarInterfaz();
});

document.getElementById('form')
.addEventListener('submit', function(event) {
  event.preventDefault();

  btnjs.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_iplyfua';

  setTimeout(() => {
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btnjs.value = 'Send Email';
        alert('¡Enviado!');
      })
      .catch((err) => {
        btnjs.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  }, 2000);
});
