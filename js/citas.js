document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Elementos DOM
    const calendarDays = document.getElementById('calendar-days');
    const timeSlots = document.getElementById('time-slots');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const appointmentForm = document.getElementById('appointment-form');
    const bookingForm = document.getElementById('booking-form');
    const summaryDate = document.getElementById('summary-date').querySelector('span');
    const summaryTime = document.getElementById('summary-time').querySelector('span');
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalButton = document.querySelector('.modal-button');
    const modalDate = document.getElementById('modal-date');
    const modalTime = document.getElementById('modal-time');
    const modalType = document.getElementById('modal-type');

    // Variables para seguimiento del estado
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTimeSlot = null;
    let currentMonthDays = [];
    
    // Configuración del calendario
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Horarios disponibles (de 9:00 a 19:00, cada 1 hora)
    const availableTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', 
                              '16:00', '17:00', '18:00', '19:00'];
    
    // Datos simulados de citas ya reservadas
    const bookedAppointments = [
        { date: '2023-12-15', time: '10:00' },
        { date: '2023-12-15', time: '11:00' },
        { date: '2023-12-16', time: '16:00' },
        { date: '2023-12-20', time: '09:00' },
        { date: '2023-12-22', time: '17:00' }
    ];

    // Inicializar calendario
    initCalendar();

    // Event Listeners
    prevMonthBtn.addEventListener('click', goToPrevMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);
    bookingForm.addEventListener('submit', handleFormSubmit);
    closeModal.addEventListener('click', closeConfirmationModal);
    modalButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Función para inicializar el calendario
    function initCalendar() {
        updateCalendarHeader();
        renderCalendar();
    }

    // Actualizar el encabezado del calendario con el mes y año actual
    function updateCalendarHeader() {
        currentMonthEl.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    // Renderizar el calendario para el mes actual
    function renderCalendar() {
        // Limpiar contenedor de días
        calendarDays.innerHTML = '';
        
        // Obtener el primer día del mes
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
        let dayOfWeek = firstDayOfMonth.getDay() - 1;
        if (dayOfWeek === -1) dayOfWeek = 6; // Si es domingo (0), convertirlo a 6
        
        // Obtener el último día del mes
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        
        // Crear array para almacenar información de días
        currentMonthDays = [];
        
        // Añadir espacios en blanco para los días antes del primer día del mes
        for (let i = 0; i < dayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }
        
        // Obtener la fecha actual para marcarla
        const today = new Date();
        
        // Añadir los días del mes
        for (let day = 1; day <= totalDays; day++) {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            
            // Crear elemento para el día
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Almacenar información del día
            const dayInfo = {
                date: dayDate,
                element: dayElement,
                day: day
            };
            
            currentMonthDays.push(dayInfo);
            
            // Marcar el día actual
            if (dayDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('current');
            }
            
            // Añadir clase para días pasados
            if (dayDate < new Date(today.setHours(0,0,0,0))) {
                dayElement.classList.add('past');
            } else {
                // Añadir event listener solo para días futuros
                dayElement.addEventListener('click', () => selectDate(dayInfo));
            }
            
            calendarDays.appendChild(dayElement);
        }
    }

    // Manejar selección de fecha
    function selectDate(dayInfo) {
        // Limpiar selección anterior
        currentMonthDays.forEach(day => {
            day.element.classList.remove('selected');
        });
        
        // Marcar nueva selección
        dayInfo.element.classList.add('selected');
        selectedDate = dayInfo.date;
        
        // Formatear fecha para mostrar
        const formattedDate = formatDate(selectedDate);
        
        // Actualizar resumen
        summaryDate.textContent = formattedDate;
        
        // Mostrar horarios disponibles
        showTimeSlots(selectedDate);
    }

    // Mostrar horarios disponibles para la fecha seleccionada
    function showTimeSlots(date) {
        // Limpiar horarios anteriores
        timeSlots.innerHTML = '';
        
        const header = document.createElement('h4');
        header.textContent = `Horarios disponibles para el ${formatDate(date)}`;
        timeSlots.appendChild(header);
        
        const slotsGrid = document.createElement('div');
        slotsGrid.classList.add('time-slots-grid');
        
        // Formatear fecha para comparación con citas reservadas
        const dateString = formatDateForComparison(date);
        
        // Generar slots de tiempo
        availableTimeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.classList.add('time-slot');
            slot.textContent = time;
            
            // Comprobar si el horario está reservado
            const isBooked = bookedAppointments.some(apt => 
                apt.date === dateString && apt.time === time
            );
            
            if (isBooked) {
                slot.classList.add('unavailable');
                slot.title = 'No disponible';
            } else {
                slot.addEventListener('click', () => selectTimeSlot(slot, time));
            }
            
            slotsGrid.appendChild(slot);
        });
        
        timeSlots.appendChild(slotsGrid);
    }

    // Seleccionar horario
    function selectTimeSlot(slotElement, time) {
        // Limpiar selección anterior
        const allSlots = document.querySelectorAll('.time-slot');
        allSlots.forEach(slot => slot.classList.remove('selected'));
        
        // Marcar nueva selección
        slotElement.classList.add('selected');
        selectedTimeSlot = time;
        
        // Actualizar resumen
        summaryTime.textContent = time;
        
        // Mostrar formulario
        appointmentForm.style.display = 'block';
        
        // Scroll al formulario
        appointmentForm.scrollIntoView({ behavior: 'smooth' });
    }

    // Función para enviar correo electrónico de confirmación
    async function sendEmailConfirmation(appointmentData) {
        try {
            const response = await fetch('/api/sendEmailConfirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: appointmentData.email,
                    nombre: appointmentData.nombre,
                    fecha: appointmentData.fecha,
                    hora: appointmentData.hora,
                    tipoSesion: appointmentData.tipoSesion
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al enviar el correo de confirmación');
            }
            
            console.log('Correo de confirmación enviado correctamente');
            return true;
        } catch (error) {
            console.error('Error enviando correo de confirmación:', error);
            return false;
        }
    }

    // Función para enviar mensaje de WhatsApp
    async function sendWhatsAppNotification(appointmentData) {
        try {
            const response = await fetch('/api/sendWhatsAppNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    telefono: appointmentData.telefono,
                    nombre: appointmentData.nombre,
                    fecha: appointmentData.fecha,
                    hora: appointmentData.hora,
                    tipoSesion: appointmentData.tipoSesion
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al enviar la notificación por WhatsApp');
            }
            
            console.log('Notificación por WhatsApp enviada correctamente');
            return true;
        } catch (error) {
            console.error('Error enviando notificación WhatsApp:', error);
            return false;
        }
    }

    // Manejar envío del formulario
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar que se ha seleccionado fecha y hora
        if (!selectedDate || !selectedTimeSlot) {
            alert('Por favor, selecciona una fecha y hora para tu cita.');
            return;
        }
        
        // Obtener datos del formulario
        const formData = new FormData(bookingForm);
        const appointmentData = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            tipoSesion: formData.get('tipo-sesion'),
            motivo: formData.get('motivo'),
            fecha: formatDate(selectedDate),
            hora: selectedTimeSlot
        };
        
        // En una aplicación real, aquí enviaríamos los datos al servidor
        console.log('Datos de la cita:', appointmentData);
        
        // Enviar correo de confirmación y notificación de WhatsApp
        try {
            // Los hacemos en paralelo para no bloquear la interfaz
            const emailPromise = sendEmailConfirmation(appointmentData);
            const whatsappPromise = sendWhatsAppNotification(appointmentData);
            
            // Esperar a que ambas promesas se resuelvan
            await Promise.all([emailPromise, whatsappPromise]);
            
            // Actualizar datos en el modal
            modalDate.textContent = appointmentData.fecha;
            modalTime.textContent = appointmentData.hora;
            modalType.textContent = appointmentData.tipoSesion === 'presencial' ? 'Presencial' : 'Online';
            
            // Mostrar modal de confirmación
            showConfirmationModal();
        } catch (error) {
            console.error('Error en el procesamiento de la cita:', error);
            alert('Ha ocurrido un error al procesar tu cita. Por favor, inténtalo de nuevo más tarde.');
        }
    }

    // Mostrar modal de confirmación
    function showConfirmationModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    // Cerrar modal de confirmación
    function closeConfirmationModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Permitir scroll
    }

    // Ir al mes anterior
    function goToPrevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        initCalendar();
    }

    // Ir al mes siguiente
    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        initCalendar();
    }

    // Funciones de utilidad
    function formatDate(date) {
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} de ${month} de ${year}`;
    }

    function formatDateForComparison(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}); 