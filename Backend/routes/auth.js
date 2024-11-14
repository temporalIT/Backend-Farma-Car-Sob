import { Router } from "express";
import {validationResult} from "express-validator";
import Usuario from "../models/Usuario.js";
import { loginValidationSchema } from "../schemas/auth.js"
import jwt from "jsonwebtoken";

const router = Router();


router.post("/login", async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {email, password} = req.body;

    const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(401).json({message: "credenciales Invalidas"});
        }

        const isPasswordValid = await usuario.checkPassword(password);
        if(!isPasswordValid){
            return res.status(401).json({message: "credenciales Invalidas"});
        }

        const token = jwt.sign(
            { sub: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.json({token});
});


export default router;