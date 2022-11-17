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
            await task.save()
            return task

            
        }catch(e){
            console.log(e)

        }
    }
})