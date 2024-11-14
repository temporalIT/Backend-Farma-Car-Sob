import { checkSchema } from "express-validator";
import Producto from "../models/Producto.js"
import Categoria from "../models/enums/Categoria.js";
import { mongoIDValidator } from "./common.js"

export const createProductoValidationSchema = checkSchema({
    nombre: {
        trim: true,
        escape: true,
        custom: {
            options: async (nombre) => {
                const ProductoExists = await Producto.findOne({
                    nombre: {$regex: new RegExp(`^${nombre}$`, "i")},
                });

                if(ProductoExists){
                    throw new Error("Producto con ese nombre ya existee")
                }
            },
            bail: true,
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "El nombre debe de tener al menos 2 caracteres",
        },
        in: ["body"],
        exists: { errorMessage: "El nombre del producto es requerido"},
        
    },
    precio: {
        exists: { errorMessage: "El precio es requerido"},
        isFloat: { options: {min: 0.0}, errorMessage: "El precio debe de tener un numero positivo"},
        in: ["body"],
       
    },
    stock: {
        optional: true,
        isInt: {options: {min: 0}, errorMessage: "El stock no debe de ser un numero negativo"},
        in: ["body"],
        
        
    },
    categoria: {
        exists: { errorMessage: "La categoria es requerida"},
        isIn: {options: [Object.values(Categoria)], errorMessage: `La categoria es invalida, las opciones serian ${Object.values(Categoria)
            .map(v => `'${v}'`)
            .join(", ")}` },
        trim: true,
        in: ["body"],
    },
});

export const getSingleProductoValidationSchema = checkSchema({
    id: mongoIDValidator,

});


export const updateProductoValidationSchema = checkSchema({
    id: mongoIDValidator,
    nombre: {
        optional: true,
        trim: true,
        escape: true,
        custom: {
            options: async (nombre, {req }) => {
                const ProductoExists = await Producto.findOne({
                    _id: { $ne: req.params.id},
                    nombre: {$regex: new RegExp(`^${nombre}$`, "i")},
                });

                if(ProductoExists){
                    throw new Error("Producto con ese nombre ya existee")
                }
            },
            bail: true,
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "El nombre debe de tener al menos 2 caracteres",
        },
        in: ["body"],
    },
    precio: {
        optional: true,
        isFloat: {
            options: {min: 0.0}, 
            errorMessage: "El precio debe de tener un numero positivo"
        },
        in: ["body"],
       
    },
    stock: {
        optional: true,
        isInt: {
            options: {min: 0}, 
            errorMessage: "El stock no debe de ser un numero negativo"},
        in: ["body"],
        
        
    },
    categoria: {
        optional: true,
        isIn: {options: [Object.values(Categoria)], 
            errorMessage: `La categoria es invalida, las opciones serian ${Object.values(Categoria)
            .map(v => `'${v}'`)
            .join(", ")}` },
        trim: true,
        in: ["body"],
    },
});


