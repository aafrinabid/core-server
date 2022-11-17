import { Controller} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskDto } from './create-task.dto';
import { EmailScheduleDto } from './emailSchedule.dto';
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
    async createTask(createTaskDto : CreateTaskDto):Promise<any>{
    const task =await this.taskService.createTask(createTaskDto)
    if(task){
        return task
    }

}


    }

