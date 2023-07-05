const formCrearReserva = document.querySelector("#formNuevaReserva")

formCrearReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const destino = document.querySelector('#destino').value;
    const fecha_vuelo = document.querySelector('#fecha_vuelo').value;
    const nombre_aereolinea = document.querySelector('#nombre_aereolinea').value;
    const cantidad_acompañantes = document.querySelector('#cantidad_acompañantes').value;
    const telefono = document.querySelector('#telefono').value;
    const email = document.querySelector('#email').value;
    const costo = document.querySelector('#costo')

    const reserva = {
        id,
        codigo,
        nombre,
        apellido,
        destino,
        fecha_vuelo,
        nombre_aereolinea,
        cantidad_acompañantes,
        telefono,
        email,
        costo
    }

    const response = await fetch('http://localhost:3500/api', {
        method: 'POST',
        body: JSON.stringify(reserva),
        headers: {
            'Content-Type': 'application/json' // Cuando se envían datos JSON al servidor
        }
    })

    const data = await response.json();

    alert(data.message)
    window.location.href = "/"



});

