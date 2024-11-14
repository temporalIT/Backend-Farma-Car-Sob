import {createApp} from "./app.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger-config.js";

const app = createApp()
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}...`);
    console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
});



