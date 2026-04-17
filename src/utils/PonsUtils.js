/**
 * PonsUtils.js - Módulo independiente para manejo de fechas
 * 
 * Este módulo contiene funciones útiles para el manejo y conversión de fechas
 * que pueden ser utilizadas en cualquier proyecto Node.js
 * 
 * Este módulo es parte del proyecto COSI BANK / COSI LAB / COSI VET, desarrollado por el Alejandro Pons.
 * 
 * @author Alejandro García La Sienrra Pons
 * @version 1.0.0
 * @since 2026-04-16
 * @license MIT
 * @copyright 2026 Alejandro García La Sienrra Pons
 * @see https://grupocosi.com/laboratorio
 * @see https://grupocosi.com/banco
 */

// Cargar moment-timezone - Node.js lo buscará desde el contexto de ejecución
// (backend-api/node_modules) cuando se ejecute desde backend-api
let moment;
try {
  moment = require('moment-timezone');
} catch (error) {
  console.warn('[PonsUtils] moment-timezone no disponible:', error.message);
  moment = null;
}

class PonsUtils {
    /**
     * Obtiene la zona horaria configurada
     * @returns {string} Zona horaria configurada o 'America/Mexico_City' por defecto
     */
    static getTimezone() {
        return process.env.TIMEZONE || 'America/Mexico_City';
    }

    /**
     * Calcula la edad a partir de la fecha de nacimiento
     * @param {string} fechaNacimiento - Fecha de nacimiento en formato DD/MM/YYYY
     * @returns {object} Edad en años, meses y días
     */
    static calcularEdad(fechaNacimiento) {
        try {
            if (!fechaNacimiento || fechaNacimiento.trim() === '') {
                return { años: 0, meses: 0, días: 0 };
            }

            // Parsear fecha DD/MM/YYYY
            const partes = fechaNacimiento.split('/');
            if (partes.length !== 3) {
                return { años: 0, meses: 0, días: 0 };
            }

            const dia = parseInt(partes[0]);
            const mes = parseInt(partes[1]) - 1; // Meses en JS van de 0-11
            const año = parseInt(partes[2]);

            const fechaNac = new Date(año, mes, dia);
            const fechaActual = new Date();

            // Verificar que la fecha sea válida
            if (isNaN(fechaNac.getTime())) {
                return { años: 0, meses: 0, días: 0 };
            }

            // Calcular diferencia
            let años = fechaActual.getFullYear() - fechaNac.getFullYear();
            let meses = fechaActual.getMonth() - fechaNac.getMonth();
            let días = fechaActual.getDate() - fechaNac.getDate();

            // Ajustar si el día actual es menor que el día de nacimiento
            if (días < 0) {
                meses--;
                const ultimoMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
                días += ultimoMes.getDate();
            }

            // Ajustar si el mes actual es menor que el mes de nacimiento
            if (meses < 0) {
                años--;
                meses += 12;
            }

            return { años, meses, días };
        } catch (error) {
            console.error('Error calculando edad:', error);
            return { años: 0, meses: 0, días: 0 };
        }
    }

    /**
     * Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD
     * @param {string} fechaDDMMYYYY - Fecha en formato DD/MM/YYYY
     * @returns {string} Fecha en formato YYYY-MM-DD
     */
    static convertirFechaDDMMYYYY(fechaDDMMYYYY) {
        if (!fechaDDMMYYYY || fechaDDMMYYYY.trim() === '') {
            return null;
        }

        const partes = fechaDDMMYYYY.split('/');
        if (partes.length !== 3) {
            return null;
        }

        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]);
        const año = parseInt(partes[2]);

        if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
            return null;
        }

        return `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    }

    /**
     * Convierte fecha ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss) a DD/MM/YYYY
     * @param {string} fechaISO - Fecha en formato ISO
     * @returns {string} Fecha en formato DD/MM/YYYY o cadena vacía
     */
    static convertirFechaISOaDDMMYYYY(fechaISO) {
        if (!fechaISO || typeof fechaISO !== 'string') {
            return '';
        }
        const parts = fechaISO.split('T')[0].split('-');
        if (parts.length !== 3) {
            return '';
        }
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    }

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD
     * @returns {string} Fecha actual en formato YYYY-MM-DD
     */
    static getFechaActual() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene la hora actual en formato HH:MM:SS usando la zona horaria configurada
     * @returns {string} Hora actual en formato HH:MM:SS
     */
    static getHoraActual() {
        // Si no hay moment-timezone disponible, usar método original
        if (typeof moment === 'undefined') {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
        return moment().tz(this.getTimezone()).format('HH:mm:ss');
    }

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD usando toISOString
     * @returns {string} Fecha actual en formato YYYY-MM-DD
     */
    static getFechaActualISO() {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    }

    /**
     * Genera una contraseña aleatoria
     * @param {number} longitud - Longitud de la contraseña
     * @returns {string} Contraseña aleatoria
     */
    static generarPasswordAleatorio(longitud) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789';
        let password = '';
        for (let i = 0; i < longitud; i++) {
            password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return password;
    }

    /**
     * Calcula la fecha de entrega (fecha actual + 1 día)
     * @returns {string} Fecha de entrega en formato YYYY-MM-DD
     */
    static getFechaEntrega() {
        const fechaEntrega = new Date();
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        const year = fechaEntrega.getFullYear();
        const month = (fechaEntrega.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaEntrega.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene el año actual en formato de 2 dígitos
     * @returns {string} Año actual en formato YY
     */
    static getAnioActual2Digitos() {
        const anioActual = new Date().getFullYear();
        return anioActual.toString().slice(-2);
    }

    /**
     * Formatea una fecha de manera segura evitando problemas de zona horaria
     * @param {string|Date} fechaInput - Fecha a formatear (string ISO, YYYY-MM-DD o Date)
     * @param {string} formatoSalida - Formato de salida (por defecto: 'dd/MM/yyyy')
     * @returns {string} Fecha formateada o mensaje de error
     */
    static formatearFechaSafe(fechaInput, formatoSalida = 'dd/MM/yyyy') {
        try {
            if (!fechaInput) {
                console.warn('⚠️ Fecha undefined o vacía:', fechaInput);
                return 'Sin fecha';
            }
            
            let fecha;
            
            // Si es un objeto Date, usarlo directamente
            if (fechaInput instanceof Date) {
                fecha = fechaInput;
                console.log('📅 Fecha es objeto Date:', fecha);
            } 
            // Si es string, convertir a Date de manera segura para evitar problemas de zona horaria
            else if (typeof fechaInput === 'string') {
                // Para cualquier fecha ISO (YYYY-MM-DDTHH:mm:ss.sssZ), extraer solo la parte de fecha
                if (fechaInput.includes('T') && fechaInput.includes('-')) {
                    const fechaParte = fechaInput.split('T')[0]; // Obtener solo YYYY-MM-DD
                    if (fechaParte.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        const [year, month, day] = fechaParte.split('-').map(Number);
                        fecha = new Date(year, month - 1, day); // month - 1 porque Date usa 0-indexado para meses
                        //console.log('📅 Fecha ISO procesada:', fechaInput, '-> parte fecha:', fechaParte, '-> resultado:', fecha);
                    } else {
                        // Si no es formato válido, usar parseo directo
                        fecha = new Date(fechaInput);
                        console.log('📅 Fecha ISO inválida, parseada directamente:', fechaInput, '->', fecha);
                    }
                }
                // Para fechas en formato YYYY-MM-DD, crear fecha local sin zona horaria
                else if (fechaInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    const [year, month, day] = fechaInput.split('-').map(Number);
                    fecha = new Date(year, month - 1, day); // month - 1 porque Date usa 0-indexado para meses
                    //console.log('📅 Fecha convertida desde string:', fechaInput, '->', fecha);
                } 
                // Para otros formatos, intentar parseo directo
                else {
                    fecha = new Date(fechaInput);
                    //console.log('📅 Fecha parseada directamente:', fechaInput, '->', fecha);
                }
            }
            // Si no es ni Date ni string, error
            else {
                console.error('❌ Tipo de fecha no soportado:', typeof fechaInput, fechaInput);
                return 'Tipo inválido';
            }
            
            if (isNaN(fecha.getTime())) {
                console.error('❌ Fecha inválida después de conversión:', fechaInput);
                return 'Fecha inválida';
            }
            
            // Formatear según el formato solicitado
            return this.formatearFechaConFormato(fecha, formatoSalida);
        } catch (error) {
            console.error('❌ Error formateando fecha:', fechaInput, error);
            return 'Error formato';
        }
    }

    /**
     * Formatea una fecha con el formato especificado
     * @param {Date} fecha - Objeto Date válido
     * @param {string} formato - Formato deseado (dd/MM/yyyy, dd 'de' MMMM 'de' yyyy, etc.)
     * @returns {string} Fecha formateada
     */
    static formatearFechaConFormato(fecha, formato) {
        const day = fecha.getDate().toString().padStart(2, '0');
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const year = fecha.getFullYear();
        
        // Nombres de meses en español
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const nombreMes = meses[fecha.getMonth()];
        
        // Aplicar formato
        switch (formato) {
            case 'dd/MM/yyyy':
                return `${day}/${month}/${year}`;
            case 'dd \'de\' MMMM \'de\' yyyy':
                return `${day} de ${nombreMes} de ${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            default:
                // Para formatos no reconocidos, devolver dd/MM/yyyy
                return `${day}/${month}/${year}`;
        }
    }

    /**
     * Convierte fecha de string ISO a formato local sin zona horaria
     * @param {string} fechaISO - Fecha en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
     * @returns {string} Fecha en formato YYYY-MM-DD
     */
    static isoToLocalDate(fechaISO) {
        if (!fechaISO || typeof fechaISO !== 'string') {
            return null;
        }
        
        // Si contiene 'T', es formato ISO
        if (fechaISO.includes('T')) {
            const fechaParte = fechaISO.split('T')[0];
            return fechaParte; // Ya está en formato YYYY-MM-DD
        }
        
        return fechaISO; // Si no es ISO, devolverlo tal como está
    }

    /**
     * Convierte cualquier tipo de fecha a formato YYYY-MM-DD para formularios
     * @param {Date|string|null|undefined} fechaInput - Fecha en cualquier formato
     * @returns {string} Fecha en formato YYYY-MM-DD o string vacío
     */
    static convertirFechaParaFormulario(fechaInput) {
        if (!fechaInput) {
            return '';
        }
        
        if (fechaInput instanceof Date) {
            return this.getLocalDateString(fechaInput);
        } else if (typeof fechaInput === 'string') {
            return this.isoToLocalDate(fechaInput);
        }
        
        return '';
    }

    /**
     * Obtiene fecha local en formato YYYY-MM-DD sin efectos de zona horaria
     * @param {Date} date - Fecha base (por defecto: fecha actual)
     * @param {number} offsetDays - Días a agregar/restar (por defecto: 0)
     * @returns {string} Fecha en formato YYYY-MM-DD
     */
    static getLocalDateString(date = new Date(), offsetDays = 0) {
        // Crear fecha local sin efectos de zona horaria
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        
        // Aplicar offset de días si se especifica
        if (offsetDays !== 0) {
            localDate.setUTCDate(localDate.getUTCDate() + offsetDays);
        }

        // Usar métodos UTC sobre la fecha ya ajustada localmente
        const year = localDate.getUTCFullYear();
        const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(localDate.getUTCDate()).padStart(2, '0');

        const result = `${year}-${month}-${day}`;

        // Debug removido para producción

        return result;
    }

    /**
     * Obtiene fecha de HOY en zona horaria local
     * @returns {string} Fecha de hoy en formato YYYY-MM-DD
     */
    static getTodayLocalString() {
        const fechaHoy = new Date();
        const year = fechaHoy.getFullYear();
        const month = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaHoy.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD

        //const now = new Date();
        //return this.getLocalDateString(now);
    }

    /**
     * Formatea fecha para almacenamiento en base de datos MySQL
     * @param {string|Date} fechaInput - Fecha a formatear
     * @returns {string} Fecha en formato YYYY-MM-DD para MySQL
     */
    static formatearFechaParaBD(fechaInput) {
        if (!fechaInput) return null;
        
        if (fechaInput instanceof Date) {
            const year = fechaInput.getFullYear();
            const month = (fechaInput.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInput.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`; // YYYY-MM-DD
        }
        
        if (typeof fechaInput === 'string') {
            // Si es formato ISO, extraer solo la fecha
            if (fechaInput.includes('T')) {
                return fechaInput.split('T')[0];
            }
            // Si ya es YYYY-MM-DD, devolver tal como está
            if (fechaInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return fechaInput;
            }
        }
        
        return null;
    }

    /**
     * Formatea datetime para almacenamiento en base de datos MySQL
     * @param {Date} fecha - Fecha y hora
     * @returns {string} Datetime en formato YYYY-MM-DD HH:mm:ss para MySQL
     */
    static formatearDateTimeParaBD(fecha = new Date()) {
        const localDate = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000));
        return localDate.toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * Obtiene fecha de mañana en formato local YYYY-MM-DD
     * @returns {string} Fecha de mañana en formato YYYY-MM-DD
     */
    static getTomorrowLocalString() {
        const fechaManana = new Date();
        fechaManana.setDate(fechaManana.getDate() + 1);
        const year = fechaManana.getFullYear();
        const month = (fechaManana.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaManana.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene fecha de ayer en formato local YYYY-MM-DD
     * @returns {string} Fecha de ayer en formato YYYY-MM-DD
     */
    static getYesterdayLocalString() {
        const fechaAyer = new Date();
        fechaAyer.setDate(fechaAyer.getDate() - 1);
        const year = fechaAyer.getFullYear();
        const month = (fechaAyer.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaAyer.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene primer día del mes actual en formato local YYYY-MM-DD
     * @returns {string} Primer día del mes en formato YYYY-MM-DD
     */
    static getFirstDayOfCurrentMonth() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const year = firstDay.getFullYear();
        const month = (firstDay.getMonth() + 1).toString().padStart(2, '0');
        const day = firstDay.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene último día del mes actual en formato local YYYY-MM-DD
     * @returns {string} Último día del mes en formato YYYY-MM-DD
     */
    static getLastDayOfCurrentMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const year = lastDay.getFullYear();
        const month = (lastDay.getMonth() + 1).toString().padStart(2, '0');
        const day = lastDay.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }

    /**
     * Obtiene primer día del mes especificado en formato local YYYY-MM-DD
     * @param {number} year - Año (ej: 2025)
     * @param {number} month - Mes (1-12)
     * @returns {string} Primer día del mes en formato YYYY-MM-DD
     */
    static getFirstDayOfMonth(year, month) {
        const firstDay = new Date(year, month - 1, 1);
        const yearStr = firstDay.getFullYear();
        const monthStr = (firstDay.getMonth() + 1).toString().padStart(2, '0');
        const dayStr = firstDay.getDate().toString().padStart(2, '0');
        return `${yearStr}-${monthStr}-${dayStr}`; // YYYY-MM-DD
    }

    /**
     * Obtiene último día del mes especificado en formato local YYYY-MM-DD
     * @param {number} year - Año (ej: 2025)
     * @param {number} month - Mes (1-12)
     * @returns {string} Último día del mes en formato YYYY-MM-DD
     */
    static getLastDayOfMonth(year, month) {
        const lastDay = new Date(year, month, 0); // día 0 del siguiente mes = último día del mes actual
        const yearStr = lastDay.getFullYear();
        const monthStr = (lastDay.getMonth() + 1).toString().padStart(2, '0');
        const dayStr = lastDay.getDate().toString().padStart(2, '0');
        return `${yearStr}-${monthStr}-${dayStr}`; // YYYY-MM-DD
    }

    /**
     * Formatea hora para mostrar
     * @param {string} time - Hora en formato HH:MM:SS o HH:MM
     * @returns {string} Hora en formato HH:MM
     */
    static formatTime(time) {
        if (!time) return '';
        return time.substring(0, 5); // Extraer HH:MM
    }

    /**
     * Formatea fecha y hora para mostrar
     * @param {string} date - Fecha en formato YYYY-MM-DD o ISO
     * @param {string} time - Hora en formato HH:MM:SS o HH:MM
     * @returns {string} Fecha y hora formateadas
     */
    static formatDateTime(date, time) {
        const fechaFormateada = this.formatearFechaSafe(date);
        const horaFormateada = this.formatTime(time);
        return `${fechaFormateada} ${horaFormateada}`;
    }

    /**
     * Obtiene el nombre del día de la semana
     * @param {Date|string} fecha - Fecha object o fecha en formato YYYY-MM-DD o ISO
     * @returns {string} Nombre del día de la semana
     */
    static getDayName(fecha) {
        try {
            let fecha_obj;
            
            if (fecha instanceof Date) {
                fecha_obj = fecha;
            } else if (typeof fecha === 'string') {
                // Si es string, crear Date object desde YYYY-MM-DD
                const fechaLocal = this.isoToLocalDate(fecha);
                fecha_obj = new Date(fechaLocal + 'T12:00:00');
            } else {
                throw new Error('Tipo de fecha no válido');
            }
            
            const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            return dias[fecha_obj.getDay()];
        } catch (error) {
            console.error('❌ Error obteniendo nombre del día:', fecha, error);
            return 'día desconocido';
        }
    }

    /**
     * Obtiene mes y año formateados
     * @param {Date|string} fecha - Fecha object o fecha en formato YYYY-MM-DD o ISO
     * @returns {string} Mes y año en español
     */
    static getMonthYear(fecha) {
        try {
            let fecha_obj;
            
            if (fecha instanceof Date) {
                fecha_obj = fecha;
            } else if (typeof fecha === 'string') {
                // Si es string, crear Date object desde YYYY-MM-DD
                const fechaLocal = this.isoToLocalDate(fecha);
                fecha_obj = new Date(fechaLocal + 'T12:00:00');
            } else {
                throw new Error('Tipo de fecha no válido');
            }
            
            const meses = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];
            const mes = meses[fecha_obj.getMonth()];
            const año = fecha_obj.getFullYear();
            return `${mes} ${año}`;
        } catch (error) {
            console.error('❌ Error obteniendo mes y año:', fecha, error);
            return 'fecha desconocida';
        }
    }

    /**
     * Formatea fecha completa con día de la semana, día, mes y año
     * @param {Date|string} fecha - Fecha object o fecha en formato YYYY-MM-DD o ISO
     * @returns {string} Fecha formateada como "lunes, 31 de marzo de 2025"
     */
    static formatearFechaCompleta(fecha) {
        try {
            let fecha_obj;
            
            if (fecha instanceof Date) {
                fecha_obj = fecha;
            } else if (typeof fecha === 'string') {
                // Si es string, crear Date object desde YYYY-MM-DD
                const fechaLocal = this.isoToLocalDate(fecha);
                fecha_obj = new Date(fechaLocal + 'T12:00:00');
            } else {
                throw new Error('Tipo de fecha no válido');
            }
            
            const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            const meses = [
                'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
            ];
            
            const diaSemana = dias[fecha_obj.getDay()];
            const dia = fecha_obj.getDate();
            const mes = meses[fecha_obj.getMonth()];
            const año = fecha_obj.getFullYear();
            
            return `${diaSemana}, ${dia} de ${mes} de ${año}`;
        } catch (error) {
            console.error('❌ Error formateando fecha completa:', fecha, error);
            return 'fecha desconocida';
        }
    }

    /**
     * Convierte un valor binario a decimal
     * Detecta si el valor es binario (contiene solo '0' y '1') y lo convierte a decimal
     * Si ya es un número decimal, lo devuelve como está
     * @param {string|number|null|undefined} valor - Valor a convertir (binario como string o número decimal)
     * @returns {number} Valor convertido a decimal (0 si es null, undefined o inválido)
     * @example
     */
    static convertirBinarioADecimal(valor) {
        if (valor === null || valor === undefined || valor === '') {
            return 0;
        }
        
        const valorStr = String(valor).trim();
        
        // Si es un string binario convertirlo a decimal
        if (valorStr.match(/^[01]{1,8}$/)) {
            return parseInt(valorStr, 2);
        }
        
        // Ya es un número, convertir directamente
        const parsed = parseInt(valorStr, 10);
        return isNaN(parsed) ? 0 : parsed;
    }

    /**
     * Convierte un valor a booleano
     * @param {string|number|boolean|null|undefined} valor - Valor a convertir
     * @returns {boolean} True si es '1', 1, 'true' o true. False en caso contrario.
     */
    static toBoolean(valor) {
        if (valor === true || valor === '1' || valor === 1) return true;
        if (typeof valor === 'string' && valor.toLowerCase() === 'true') return true;
        return false;
    }

    /**
     * Formatea una cantidad a moneda (MXN)
     * @param {number|string} amount - Cantidad a formatear
     * @returns {string} Cantidad formateada como moneda ($0.00)
     */
    static formatCurrency(amount) {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (isNaN(num)) return '$0.00';
        
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(num);
    }

}

module.exports = PonsUtils; 