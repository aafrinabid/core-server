import { Controller} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskDto } from './create-task.dto';
import { EmailScheduleDto } from './emailSchedule.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

interface NotificationService {
    sendMail(emailSchedule:EmailScheduleDto) : {result:string}
}

@Controller('task')
export class TaskController {
    
    constructor(
        private taskService :TaskService,
         ){}

  

    @GrpcMethod('TaskService') 
    async createTask(createTaskDto : CreateTaskDto):Promise<Task>{
    const task =await this.taskService.createTask(createTaskDto)
    if(task){
        return task
    }

    }
    
    @GrpcMethod('TaskService')
    viewAllTask():Promise< {items:Task[]}>{
    return this.taskService.viewAllTask()
    }

    @GrpcMethod('TaskService')
    getEmailSentTasks():Promise<{items:Task[]}> {
        return this.taskService.getEmailSentTasks()
    }

    @GrpcMethod('TaskService')
    getEmailNotSentTasks():Promise<{items:Task[]}> {
        return this.taskService.getEmailNotSentTasks()
    }

    }

