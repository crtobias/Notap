import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/mongoose";
import Task from "../../../../models/Task";
// busca todas las tareas del usuario
export async function GET(request, { params }) {
    try {
        connectDB();
        const createdBy = params.id; // ID del usuario creador
        const tasks = await Task.find({ createdBy }); // Buscar todas las tareas con el mismo createdBy
        if (!tasks || tasks.length === 0) {
            return NextResponse.json({
                message: "No tasks found for the given createdBy ID",
            }, {
                status: 404
            });
        }
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}