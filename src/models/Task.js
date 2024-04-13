


import { Schema,model, models } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        required: [true, "el titulo es requerido"],
        unique:true, // para que no se repita con otros titulos que existen
        trim:true // saca espacios al final y adelante
    },
    description:{
        type : String,
        required:[true,"la descripcion es requerida"],
        trim:true
    },
    createdBy: {
        type: Schema.Types.ObjectId, // Tipo de dato para almacenar el ID del usuario
        ref: 'User' // Referencia al modelo de usuario
    }
},
{
    timestamps: true, // fecha de creacion agregada a la db
})

export default models.Task || model('Task', taskSchema)
// models.task dice que si existe lo use y sino que lo crea

