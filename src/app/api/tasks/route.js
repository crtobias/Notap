import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/mongoose";
import Task from "../../../models/Task";

export async function GET() {
    connectDB();
    const tasks = await Task.find(); //find = buscar o traer
    return NextResponse.json(tasks);
}



export async function POST(request) {
    try {
        const data = await request.json(); // Obtener los datos de la solicitud

        const newTask = new Task(data);
        const savedTask = await newTask.save(); //save  guardar o crear
        // console.log(savedTask);
        return NextResponse.json(savedTask);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}