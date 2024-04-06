import { Schema,model,models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    fullname: {
        type: String,
        required: [true, "Password is required"],
        minLength: [3, "FullName must be at least 3 characters"],
        maxLength: [50, "FullName must be at most 50 characters"],
    },
});


// const User = models.user || model('User', userSchema)

let User;

try {
    // Intenta obtener el modelo existente
    User = model('User');
} catch (error) {
    // Si no existe, crea un nuevo modelo
    User = model('User', userSchema);
}



export default User; 