export const PAGES = {
    HOME: {
        HEADER: "Inicio"
    },
    DASHBOARD: {
        HEADER: "Panel de Administración"
    },
    BOOKINGS: {
        HEADER: "Reservas"
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
        }
    },
    LOGIN: {
        HEADER: "Iniciar sesión"
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
