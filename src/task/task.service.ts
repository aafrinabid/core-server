import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './create-task.dto';
import { EmailScheduleDto } from './emailSchedule.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';



@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TasksRepository)
        private readonly tasksRepository: TasksRepository
    ){}

   async createTask(createTaskDto: CreateTaskDto):Promise<Task> {
        try{

            return await this.tasksRepository.CreateTask(createTaskDto)
        }catch(e){
            console.log(e)
                }
    }

   async viewAllTask():Promise<{items:Task[]}> {
        try{
            return this.tasksRepository.ViewAllTasks()

        }catch(e){
            console.log(e)
        }
    }

    async getEmailSentTasks():Promise<{items:Task[]}> {
        try{
               return await this.tasksRepository.GetEmailSentTasks()
        }catch(e){
            console.log(e)
        }
    }

    async getEmailNotSentTasks():Promise<{items:Task[]}> {
        try{
            return await this.tasksRepository.GetEmailNotSentTasks()

        }catch(e){
            console.log(e)
        }
    }

 
}
