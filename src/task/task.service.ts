import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './create-task.dto';
import { EmailScheduleDto } from './emailSchedule.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';



@Injectable()
export class TaskService {

    createTask(createTaskDto: CreateTaskDto):Promise<Task> {
        try{

            return TaskRepository.createTask(createTaskDto)
        }catch(e){
            console.log(e)
                }
    }

   async viewAllTask():Promise<{items:Task[]}> {
        try{
            return await TaskRepository.viewAllTasks()

        }catch(e){
            console.log(e)
        }
    }

    async getEmailSentTasks():Promise<{items:Task[]}> {
        try{
            return await TaskRepository.getEmailSentTasks()

        }catch(e){
            console.log(e)
        }
    }

    async getEmailNotSentTasks():Promise<{items:Task[]}> {
        try{
            return await TaskRepository.getEmailNotSentTasks()

        }catch(e){
            console.log(e)
        }
    }

 
}
