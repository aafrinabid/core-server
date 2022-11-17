import { ConflictException } from "@nestjs/common";
import { retry } from "rxjs";
import { AppDataSource } from "src/app-data-source";
import { CreateTaskDto } from "./create-task.dto";
import { Task } from "./task.entity";

export const TaskRepository = AppDataSource.getRepository(Task).extend({
    async createTask(createTaskDto: CreateTaskDto){
        try{
            const date = new Date(createTaskDto.reminderDate)
            const dateNow = new Date(Date.now())
            console.log(date,dateNow)
            if(date<dateNow) {
        throw new ConflictException('past date or time detected') 

            }
            const task = new Task();
            const {title,description,assignedPerson,reminderDate} = createTaskDto;
            task.title = title;
            task.description = description;
            task.assignedPerson = assignedPerson;
            task.reminderDate = reminderDate;
            task.emailSent=false
            await task.save()
            return task

            
        }catch(e){
            console.log(e)

        }
    },
    
    async viewAllTasks(){
        try{
            const allTasks = await Task.find();
            return {items: allTasks}
        }catch(e){
            console.log(e)
        }
    },

    async getEmailSentTasks() {
        try{
            return {items:await Task.find({where:{emailSent:true}})}

        }catch(e){
            console.log(e)
        }

    },

    async getEmailNotSentTasks() {
        try{
            return {items:await Task.find({where:{emailSent:false}})}

        }catch(e){
            console.log(e)
        }

    }
})