const formReserva = document.querySelector('#formNuevaReserva');
const reservaId = formReserva.dataset.id;

const nombre = document.querySelector('#nombre').value;
const apellido = document.querySelector('#apellido').value;
const destino = document.querySelector('#destino').value;
const fecha_vuelo = document.querySelector('#fecha_vuelo').value;
const nombre_aereolinea = document.querySelector('#nombre_aereolinea').value;
const cantidad_acompañantes = document.querySelector('#cantidad_acompañantes').value;
const telefono = document.querySelector('#telefono').value;
const email = document.querySelector('#email').value;
const costo = document.querySelector('#costo')

document.addEventListener('DOMContentLoaded', async () => {
    // Traemos la reserva que se va a editar
    const response = await fetch(`/api/${reservaId}`);
    const data = await response.json();

    // Mostrar en el formulario los datos de la reserva que se quiere actualizar
    nombre.value = data.nombre;
    apellido.value = data.apellido;
    destino.value = data.fecha_ingreso;
    fecha_vuelo.value = data.fecha_salida;
    nombre_aereolinea.value = data.habitacion;
    cantidad_acompañantes.value = data.cantidad_personas;
    telefono.value = data.telefono;
    email.value = data.email;
    costo.value = data.email;
});


formReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    reservaActualizada = {
        nombre: nombre.value,
        apellido: apellido.value,
        destino: destino.value,
        fecha_vuelo: fecha_vuelo.value,
        nombre_aereolinea: nombre_aereolinea.value,
        cantidad_acompañantes: cantidad_acompañantes.value,
        telefono: telefono.value,
        email: email.value,
        costo: costo.value
    }


    // Se envían los nuevos datos al servidor express
    const response = await fetch(`/api/${reservaId}`, {
        method: 'PUT',
        body: JSON.stringify(reservaActualizada),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // const data = await response.json();

    // Mostrar mensajes al usuario
    alert(data.message);

    // Redireccionar al usuario




})