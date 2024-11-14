import {Schema, model} from "mongoose";
import Categoria from "./enums/Categoria.js";

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    categoria: {
        type: String,
        required: true,
        enum: Object.values(Categoria),
    },
})

export default model("Producto", productoSchema);