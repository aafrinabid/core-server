import { ConflictException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./create-task.dto";
import { Task } from "./task.entity";

export class TasksRepository extends Repository<Task> {
    async CreateTask(createTaskDto: CreateTaskDto):Promise<Task>{
        try{
            const date = new Date(createTaskDto.reminderDate)
            const dateNow = new Date(Date.now())
            if(date<dateNow) {
        throw new ConflictException('past date or time detected') 

            }
            const task = new Task();
            const {title,description,assignedPerson,reminderDate} = createTaskDto;
            task.title = title;
            task.description = description;
            task.assignedPerson = assignedPerson;
            task.reminderDate = date;
            task.emailSent=false
            await task.save()
            return task

            
        }catch(e){
            console.log(e)

        }
    }
    
    async ViewAllTasks() : Promise<{items:Task[]}> {
        try{
            const allTasks = await Task.find();
            return {items: allTasks}
        }catch(e){
            console.log(e)
        }
    }

    async GetEmailSentTasks():Promise<{items:Task[]}>  {
        try{
            return {items:await Task.find({where:{emailSent:true}})}

        }catch(e){
            console.log(e)
        }

    }

    async GetEmailNotSentTasks(): Promise<{items:Task[]}> {
        try{
            return {items:await Task.find({where:{emailSent:false}})}

        }catch(e){
            console.log(e)
        }

    }
}