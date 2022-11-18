import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './create-task.dto';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;
  let createTaskDto:CreateTaskDto ={
    title:'groceries',
    description:'milk',
    assignedPerson: 'mohdaafrin@gmail.com',
    reminderDate: 'some date'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService]
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create task',async ()=> {
   let result: Promise<Task>
   jest.spyOn(service,'createTask').mockImplementation(()=>result)
   expect(await controller.createTask(createTaskDto)).toBe(result)
  })

  it('should find all tasks', async ()=> {
   let result:Promise<{items:Task[]}>
   jest.spyOn(service,'viewAllTask').mockImplementation(()=>result)
   expect(await controller.viewAllTask()).toBe(result)
  })

  it('should get all task where email was sent',async ()=>{
    let result:Promise<{items:Task[]}>
    jest.spyOn(service,'getEmailSentTasks').mockImplementation(()=>result)
    expect(await controller.getEmailSentTasks()).toBe(result)
  })

  it('should find all task where email was not sent',async ()=> {
    let result:Promise<{items:Task[]}>
    jest.spyOn(service,'getEmailNotSentTasks').mockImplementation(()=>result)
    expect(await controller.getEmailNotSentTasks()).toBe(result)
  })

})
