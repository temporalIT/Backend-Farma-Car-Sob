import {checkSchema}  from 'express-validator';

const loginValidationSchema = checkSchema({
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'Porfavor ingrese un correo valido'
        },
        normalizeEmail: true,
        exists: {
            errorMessage: "Correo es requerido",
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 6},
            errorMessage: "La contrasenia debe de tener al menos 6 caracteres"
        },
        exists: {
            errorMessage: "Contrasenia es requerida",
        },
    }
});

