import { Router } from "express";
import {validationResult} from "express-validator";
import{
    createProductoValidationSchema, 
    getSingleProductoValidationSchema, 
    updateProductoValidationSchema} from "../schemas/productos.js"
import{paginationValidationSchema} from "../schemas/pagination.js"
import Producto from "../models/Producto.js";

const router = Router();

//Create
router.post("/", createProductoValidationSchema, async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send({errors: result.array() });
    }
    
    const producto = await Producto.create(req.body);

    return res.json(producto)
});

//Read
router.get("/", paginationValidationSchema, async (req, res) => {

        const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send({errors: result.array() });
    }


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;

        const productos = await Producto.find().skip(startIndex).limit(limit);

        const totalProductos = await Producto.countDocuments();

        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalProductos / limit),
            totalProductos,
            productos,
        });
    
}); 

//Details
router.get("/:id", getSingleProductoValidationSchema, async  (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).send({errors: result.array() });
    }

    const producto = await Producto.findById(req.params.id);

    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado"});
    }
    res.json(producto);
});

//Update
router.put('/:id', updateProductoValidationSchema, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const updateProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!updateProducto){
        return res.status(404).json({ message: 'Producto no encontrado'});
    }

    res.json(updateProducto);
});

//Delete
router.delete("/:id", getSingleProductoValidationSchema, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const deleteProducto = await Producto.findByIdAndDelete(req.params.id);

    if(!deleteProducto){
        return res.status(404).json({message: "Producto no encontrado"});
    }

    res.json({message: "Producto eliminado satisfactoriamente", deleteProducto});
});



export default router;

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Obtener productos
 *     description: Retorna la lista de productos disponibles
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 6735b01624f2aa85b7b21615
 *                   nombre:
 *                     type: string
 *                     example: "Ibuprofeno"
 *                   precio:
 *                     type: number
 *                     format: float
 *                     example: 30.0
 *                  
 *                  
 */