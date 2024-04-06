import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/mongoose";
import Task from "../../../../models/Task";


// buscar tarea por id
export async function GET(request, {params}){ 
    try {
        connectDB()
        const oneTask = await Task.findOne({_id: params.id})
        if(!oneTask) return NextResponse.json({
            message: "Task not found",
        },{
            status:404
        })
        return NextResponse.json(oneTask)
    } catch (error) {
        return NextResponse.json(error.message,{
            status:400
        })
    }
}
// async function loadTask(session) {
//   connectDB();
//   const userId = session.user._id;

//   const tasks = await Task.find({ createdBy: userId });
//   return tasks;
// }


export async function DELETE(request, {params}){

    try {
        const taskDelete = await Task.findByIdAndDelete(params.id)
    if(!taskDelete){
        return NextResponse.json({
            message: "Task not found",
        },{
            status: 404
        })
    }
    return NextResponse.json(taskDelete)
    } catch (error) {
        return NextResponse.json(error.message,{
            status:400
        })
    }
}





export async function PUT(request, {params}){
    try {
        
    const data = await request.json()
    console.log(data);

    const taskUpdated = await Task.findByIdAndUpdate(params.id,data,{
        new: true //es para que devuelva el dato actualizado
    })

    return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json(error.message,{
            status: 400
        })
    }
}