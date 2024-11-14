import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new Schema(
    {
        email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
},
{ timestamps: true}

);

usuarioSchema.static.hashPassword = async function (password){
    return bcrypt.hash(password, 10);
}

usuarioSchema.methods.checkPassword = async function (password){
    return bcrypt.compare(password, this.password);
}

usuarioSchema.static.hashPassword = async function (password){
    return bcrypt.hash(password, 10);
}

usuarioSchema.pre("save", async function(){ 
    if (this.isModified("password") || (this.isNew && this.password)) {
        this.password = await this.model("Usuario").hashPassword(this.password);
    }
});

export default model("Usuario", usuarioSchema);