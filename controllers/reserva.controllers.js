const Reserva = require('../models/Reserva');
const ctrl = {};

// ========================================
//          Rutas para vistas               
// ========================================
ctrl.renderListaReservas = (req, res) => {
    res.render('lista-reservas')
}

ctrl.renderNuevaReserva = (req, res) => {
    res.render('nueva-reserva');
}

ctrl.renderEditarReserva = (req, res) => {
    const { id } = req.params;
    res.render('editar-reserva', { id })
}


// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
//Que el estado esté en true es por que despues para borrar se reemplaza por false.
ctrl.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true
            }
        });

        return res.json(reservas);
    } catch (error) {
        console.log('Oops, ocurrio un error:', error);
        return res.status(500).json({
            message: 'Algo salió mal, no se pudo obtener las reservas.'
        })
    }
}
// Obtener una reserva, en este caso la obtiene a traves de la clave primaria (id)
ctrl.obtenerReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);
        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Algo salio mal, no se pudo obtener la reserva.'
        })
    }
}
// Crear una reserva
ctrl.crearReserva = async (req, res) => {
    const {
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
    } = req.body; // JSON.stringify(reserva);

    try {
        // Se crea una nueva instancia de reserva
        const nuevaReserva = new Reserva({
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
        });

        // Se guarda en la BD
        await nuevaReserva.save();

        return res.status(201).json({ message: 'La reserva se creó con éxito' })
    } catch (error) {
        console.log('Error al crear la reserva', error);
        return res.status(500).json({ message: 'Algo salió mal, no se pudo crear la reserva' })
    }
}
// Actualizar una reserva
ctrl.actualizarReserva = async (req, res) => {
    ctrl.actualizarReserva = async (req, res) => {
        try {
            const { id } = req.params;
            const reserva = await Reserva.findByPk(id);
            await reserva.update(req.body)
            return res.json({
                message: 'Reserva actualizada exitosamente'
            });
        } catch (error) {
            console.log('Oops ocurrió un error al actualizar la reserva: ', error);
            return res.status(500).json({
                message: 'Algo salió mal, no se pudo actualizar la reserva.'
            })
        }
    }
}
// Eliminar una reserva de forma lógica
ctrl.eliminarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        await reserva.update({ estado: false });
        return res.json({ message: 'Reserva se eliminó correctamente' })
    } catch (error) {
        console.log('Oops, ocurrió un error al eliminar la reserva: ', error);
        return res.status(500).json({
            message: 'Algo salió mal, no se pudo eliminar la reserva.'
        })
    }
}



module.exports = ctrl;