declare class PonsUtils {
    /**
     * Obtiene la zona horaria configurada
     * @returns {string} Zona horaria configurada o 'America/Mexico_City' por defecto
     */
    static getTimezone(): string;

    /**
     * Calcula la edad a partir de la fecha de nacimiento
     * @param {string} fechaNacimiento - Fecha de nacimiento en formato DD/MM/YYYY
     * @returns {object} Edad en años, meses y días
     */
    static calcularEdad(fechaNacimiento: string): { años: number; meses: number; días: number };

    /**
     * Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD
     * @param {string} fechaDDMMYYYY - Fecha en formato DD/MM/YYYY
     * @returns {string|null} Fecha en formato YYYY-MM-DD
     */
    static convertirFechaDDMMYYYY(fechaDDMMYYYY: string): string | null;

    /**
     * Convierte fecha ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss) a DD/MM/YYYY
     * @param {string} fechaISO - Fecha en formato ISO
     * @returns {string} Fecha en formato DD/MM/YYYY o cadena vacía
     */
    static convertirFechaISOaDDMMYYYY(fechaISO: string): string;

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD
     * @returns {string} Fecha actual en formato YYYY-MM-DD
     */
    static getFechaActual(): string;

    /**
     * Obtiene la hora actual en formato HH:MM:SS
     * @returns {string} Hora actual en formato HH:MM:SS
     */
    static getHoraActual(): string;

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD usando toISOString
     * @returns {string} Fecha actual en formato YYYY-MM-DD
     */
    static getFechaActualISO(): string;

    /**
     * Genera una contraseña aleatoria
     * @param {number} longitud - Longitud de la contraseña
     * @returns {string} Contraseña aleatoria
     */
    static generarPasswordAleatorio(longitud: number): string;

    /**
     * Obtiene la fecha de entrega (mañana)
     * @returns {string} Fecha de entrega en formato YYYY-MM-DD
     */
    static getFechaEntrega(): string;

    /**
     * Obtiene el año actual en formato de 2 dígitos
     * @returns {string} Año actual en formato YY
     */
    static getAnioActual2Digitos(): string;

    /**
     * Formatea una fecha de forma segura
     * @param {Date|string|null|undefined} fechaInput - Fecha a formatear
     * @param {string} formatoSalida - Formato de salida (default: 'dd/MM/yyyy')
     * @returns {string} Fecha formateada
     */
    static formatearFechaSafe(fechaInput: Date | string | null | undefined, formatoSalida?: string): string;

    /**
     * Formatea una fecha con un formato específico
     * @param {Date} fecha - Fecha a formatear
     * @param {string} formato - Formato deseado
     * @returns {string} Fecha formateada
     */
    static formatearFechaConFormato(fecha: Date, formato: string): string;

    /**
     * Convierte una fecha ISO a fecha local
     * @param {string} fechaISO - Fecha en formato ISO
     * @returns {Date|null} Fecha local o null si es inválida
     */
    static isoToLocalDate(fechaISO: string): Date | null;

    /**
     * Convierte una fecha para formulario
     * @param {Date|string|null|undefined} fechaInput - Fecha a convertir
     * @returns {string} Fecha formateada para formulario
     */
    static convertirFechaParaFormulario(fechaInput: Date | string | null | undefined): string;

    /**
     * Obtiene una fecha local como string
     * @param {Date} date - Fecha (default: new Date())
     * @param {number} offsetDays - Días de offset (default: 0)
     * @returns {string} Fecha en formato YYYY-MM-DD
     */
    static getLocalDateString(date?: Date, offsetDays?: number): string;

    /**
     * Obtiene fecha de hoy en formato local YYYY-MM-DD
     * @returns {string} Fecha de hoy en formato YYYY-MM-DD
     */
    static getTodayLocalString(): string;

    /**
     * Formatea una fecha para base de datos
     * @param {Date|string|null|undefined} fechaInput - Fecha a formatear
     * @returns {string|null} Fecha formateada para BD o null
     */
    static formatearFechaParaBD(fechaInput: Date | string | null | undefined): string | null;

    /**
     * Formatea fecha y hora para base de datos
     * @param {Date} fecha - Fecha (default: new Date())
     * @returns {string} Fecha y hora formateada para BD
     */
    static formatearDateTimeParaBD(fecha?: Date): string;

    /**
     * Obtiene fecha de mañana en formato local YYYY-MM-DD
     * @returns {string} Fecha de mañana en formato YYYY-MM-DD
     */
    static getTomorrowLocalString(): string;

    /**
     * Obtiene fecha de ayer en formato local YYYY-MM-DD
     * @returns {string} Fecha de ayer en formato YYYY-MM-DD
     */
    static getYesterdayLocalString(): string;

    /**
     * Obtiene primer día del mes actual en formato local YYYY-MM-DD
     * @returns {string} Primer día del mes actual en formato YYYY-MM-DD
     */
    static getFirstDayOfCurrentMonth(): string;

    /**
     * Obtiene último día del mes actual en formato local YYYY-MM-DD
     * @returns {string} Último día del mes actual en formato YYYY-MM-DD
     */
    static getLastDayOfCurrentMonth(): string;

    /**
     * Obtiene primer día de un mes específico en formato local YYYY-MM-DD
     * @param {number} year - Año
     * @param {number} month - Mes (1-12)
     * @returns {string} Primer día del mes en formato YYYY-MM-DD
     */
    static getFirstDayOfMonth(year: number, month: number): string;

    /**
     * Obtiene último día de un mes específico en formato local YYYY-MM-DD
     * @param {number} year - Año
     * @param {number} month - Mes (1-12)
     * @returns {string} Último día del mes en formato YYYY-MM-DD
     */
    static getLastDayOfMonth(year: number, month: number): string;

    /**
     * Formatea una hora
     * @param {string} time - Hora a formatear
     * @returns {string} Hora formateada (HH:MM)
     */
    static formatTime(time: string): string;

    /**
     * Formatea fecha y hora
     * @param {string} date - Fecha
     * @param {string} time - Hora
     * @returns {string} Fecha y hora formateadas
     */
    static formatDateTime(date: string, time: string): string;

    /**
     * Obtiene el nombre del día de la semana
     * @param {Date|string} fecha - Fecha
     * @returns {string} Nombre del día de la semana
     */
    static getDayName(fecha: Date | string): string;

    /**
     * Obtiene mes y año de una fecha
     * @param {Date|string} fecha - Fecha
     * @returns {string} Mes y año formateados
     */
    static getMonthYear(fecha: Date | string): string;

    /**
     * Formatea una fecha completa con día de la semana, día, mes y año en español
     * @param {Date|string} fecha - Fecha object o fecha en formato YYYY-MM-DD
     * @returns {string} Fecha formateada como "lunes, 31 de marzo de 2025"
     */
    static formatearFechaCompleta(fecha: Date | string): string;

    /**
     * Convierte un valor binario a decimal
     * @param {string|number|null|undefined} valor - Valor a convertir
     * @returns {number} Valor convertido a decimal
     */
    static convertirBinarioADecimal(valor: string | number | null | undefined): number;
}

export = PonsUtils;
