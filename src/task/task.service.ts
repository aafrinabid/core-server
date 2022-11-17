import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './create-task.dto';
import { EmailScheduleDto } from './emailSchedule.dto';
import { TaskRepository } from './task.repository';



@Injectable()
export class TaskService {

    createTask(createTaskDto: CreateTaskDto) {
        try{

            return TaskRepository.createTask(createTaskDto)
        }catch(e){
            console.log(e)
                }
    }

 
}
