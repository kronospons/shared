const { Sequelize } = require('sequelize');
const PonsUtils = require('./PonsUtils.js');

/**
 * Función para registrar bitácoras de sistema (equivalente a LogEmpleado en Delphi)
 * @param {string} suceso - Mensaje del suceso a registrar
 * @param {object} sequelize - Instancia de Sequelize para consultas
 * @returns {Promise<void>}
 */
async function logEmpleado(suceso, sequelize) {
    try {
        const fechaActual = PonsUtils.getFechaActual(); // YYYY-MM-DD
        const horaActual = PonsUtils.getHoraActual(); // HH:MM:SS
        
        await sequelize.query(
            `INSERT INTO log (ID, Nombre, Fecha, Hora, Suceso) VALUES (?, ?, ?, ?, ?)`,
            {
                replacements: [
                    '0',                    // ID
                    'COSI Servicio',        // Nombre
                    fechaActual,            // Fecha
                    horaActual,             // Hora
                    suceso                  // Suceso
                ],
                type: Sequelize.QueryTypes.INSERT
            }
        );
        
        console.log(`📝 Bitácora registrada: ${suceso}`);
        
    } catch (error) {
        console.error('❌ Error al registrar bitácora:', error.message);
        // No lanzar error para no interrumpir el flujo principal
    }
}

module.exports = {
    logEmpleado
}; 