export const PAGES = {
    HOME: {
        HEADER: "Inicio"
    },
    DASHBOARD: {
        HEADER: "Panel de Administración"
    },
    BOOKINGS: {
        HEADER: "Reservas",
        TABLE: {
            GLAMPING: "Glamping",
            GUEST: "Huésped",
            DATES: "Fechas",
            STATUS: "Estado",
            AMOUNT: "Monto"
        },
        DETAIL: {
            TITLE: "Reserva #{id}",
            NOT_FOUND: "Reserva no encontrada",
            BACK: "Atrás"
        },
        ROW: {
            TODAY: "Hoy",
            STARTS_IN: "Comienza en",
            NIGHT_STAY: "noche de estancia",
            NIGHTS_STAY: "noches de estancia"
        },
        DATA_BOX: {
            NIGHTS_IN_GLAMPING: "{nights} noches en Glamping",
            TODAY: "Hoy",
            GUESTS: "huéspedes",
            NATIONAL_ID: "DNI",
            OBSERVATIONS: "Observaciones",
            BREAKFAST_INCLUDED: "¿Desayuno incluido?",
            YES: "Sí",
            NO: "No",
            TOTAL_PRICE: "Precio total",
            CABIN: "glamping",
            BREAKFAST: "desayuno",
            PAID: "Pagado",
            WILL_PAY_AT_PROPERTY: "Pagar en el establecimiento",
            BOOKED: "Reservado"
        },
        STATUS: {
            UNCONFIRMED: "no confirmada",
            CHECKED_IN: "registrado",
            CHECKED_OUT: "salida"
        },
        SORT_OPTIONS: [
            {
                value: "startDate-desc",
                label: "Ordenar por fecha (reciente primero)"
            },
            {
                value: "startDate-asc",
                label: "Ordenar por fecha (antiguo primero)"
            },
            {
                value: "totalPrice-desc",
                label: "Ordenar por monto (mayor primero)"
            },
            {
                value: "totalPrice-asc",
                label: "Ordenar por monto (menor primero)"
            }
        ],
        TOASTS: {
            ERROR_GET: "Ha ocurrido un error al obtener las reservas",
            ERROR_GET_BOOKINGS_AFTER_DATE:
                "Ha ocurrido un error al obtener las reservas",
            ERROR_GET_STAYS_AFTER_DATE:
                "Ha ocurrido un error al obtener las estancias",
            ERROR_GET_STAYS_TODAY_ACTIVITY:
                "Ha ocurrido un error al obtener la actividad de las estancias",
            ERROR_UPDATE_BOOKING:
                "Ha ocurrido un error al actualizar la reserva",
            ERROR_DELETE_BOOKING: "Ha ocurrido un error al eliminar la reserva"
        }
    },
    ACCOUNT: {
        HEADER: "Cuenta",
        UPDATE_DATA: "Actualiza los datos del usuario",
        UPDATE_PASSWORD: "Actualiza la contraseña"
    },
    USERS: {
        HEADER: "Usuarios"
    },
    SETTINGS: {
        HEADER: "Configuración",
        TOASTS: {
            ERROR_GET: "Ha ocurrido un error al obtener las configuraciones",
            ERROR_UPDATE:
                "Ha ocurrido un error al actualizar las configuraciones",
            UPDATED: "Configuraciones actualizadas correctamente"
        },
        MAX_BOOKING_LENGTH: "Máximo de días de reserva",
        MAX_GUESTS_PER_BOOKING: "Máximo de huéspedes por reserva",
        MIN_BOOKING_LENGTH: "Mínimo de días de reserva"
    },
    GLAMPINGS: {
        HEADER: "Glampings",
        TABLE: {
            HEADER: "Nombre",
            CAPACITY: "Capacidad",
            WEEKDAY_PRICE: "Precio entre semana",
            FRIDAY_PRICE: "Precio Viernes",
            SATURDAY_PRICE: "Precio Sábado"
        },
        ADD_GLAMPING: "Añadir glamping",
        EDIT_GLAMPING: "Editar glamping",
        TOASTS: {
            CREATED: "Glamping creado correctamente",
            UPDATED: "Glamping actualizado correctamente",
            DELETED: "Glamping eliminado correctamente",
            ERROR_GET: "Ha ocurrido un error al obtener los glampings",
            ERROR: "Ha ocurrido un error al crear el glamping",
            ERROR_UPDATE: "Ha ocurrido un error al actualizar el glamping",
            ERROR_DELETE: "Ha ocurrido un error al eliminar el glamping",
            ERROR_UPLOAD_IMAGE: "Ha ocurrido un error al subir la imagen"
        },
        MODALS: {
            GLAMPING_FORM: "glamping-form",
            EDIT_GLAMPING_FORM: "edit-glamping-form",
            DELETE_GLAMPING_FORM: "delete-glamping-form"
        },
        FORM: {
            NAME: "Nombre del glamping",
            CAPACITY: "Capacidad máxima",
            WEEKDAY_PRICE: "Precio entre semana",
            FRIDAY_PRICE: "Precio Viernes",
            SATURDAY_PRICE: "Precio Sábado",
            DESCRIPTION: "Descripción",
            IMAGE: "Imagen del glamping",
            CANCEL: "Cancelar",
            EDIT: "Editar",
            VALIDATIONS: {
                REQUIRED: "Este campo es requerido",
                MIN: "El valor mínimo es {min}",
                MAX: "El valor máximo es {max}"
            }
        },
        SORT_OPTIONS: [
            {
                value: "name-asc",
                label: "Ordenar por nombre (A-Z)"
            },
            {
                value: "name-desc",
                label: "Ordenar por nombre (Z-A)"
            },
            {
                value: "maxCapacity-asc",
                label: "Ordenar por capacidad (menos a más)"
            },
            {
                value: "maxCapacity-desc",
                label: "Ordenar por capacidad (más a menos)"
            }
        ]
    },
    LOGIN: {
        FORM: {
            EMAIL: "Email",
            PASSWORD: "Contraseña",
            LOGIN: "Iniciar sesión",
            VALIDATIONS: {
                REQUIRED: "Este campo es requerido",
                MIN: "El valor mínimo es {min}",
                MAX: "El valor máximo es {max}"
            },
            TOASTS: {
                SUCCESS: "Inicio de sesión exitoso",
                ERROR: "Ha ocurrido un error al iniciar sesión",
                WRONG_CREDENTIALS: "El email o la contraseña son incorrectos"
            }
        }
    },
    PAGE_NOT_FOUND: {
        HEADER: "No se encontró la página"
    },
    CONFIRM_DELETE: {
        TITLE: "Eliminar {resourceName}",
        MESSAGE:
            "¿Estás seguro de querer eliminar este {resourceName} permanentemente? Esta acción no puede ser deshecha.",
        CANCEL: "Cancelar",
        DELETE: "Eliminar"
    }
};
