import mongoose from "mongoose";

export async function setupDatabase(){
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Conectado a MongoDB");
    }catch (err){
        console.error("No se pudo conectar a MongoDB", err);
        process.exit(1);
    }
}

