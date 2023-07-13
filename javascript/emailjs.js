const btnjs = document.getElementById('botonjs');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btnjs.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_iplyfua';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btnjs.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btnjs.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});