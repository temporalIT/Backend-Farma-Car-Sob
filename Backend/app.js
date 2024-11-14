import express from "express";
import helmet  from "helmet";
import morgan  from "morgan";
import {setupDatabase}  from "./database.js";
import productosRoutes from "./routes/productos.js"

export function createApp() {

    const app = express()
    setupDatabase();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(helmet());
    app.use(morgan("tiny"));

    //routes
    app.use("/productos", productosRoutes);

    app.get("/", (req, res) => {
        res.send("Hola Mundo");
    });

    return app;
}

