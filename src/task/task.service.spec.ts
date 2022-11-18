import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository = TaskRepository;
  let createTaskDto:CreateTaskDto ={
    title:'groceries',
    description:'milk',
    assignedPerson: 'mohdaafrin@gmail.com',
    reminderDate: 'some date'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create task',async () =>{
    let result : Promise<Task>
    jest.spyOn(mockRepository,'createTask').mockImplementation(()=> result)
    expect(await service.createTask(createTaskDto)).toBe(result)
   
  })

  it('should fetch all tasks from repository' , async ()=>{
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'viewAllTasks').mockImplementation(()=>result)
    expect( await service.viewAllTask()).toBe(result)
  })

  it('should get all tasks where email reminder is sent', async ()=> {
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'getEmailSentTasks').mockImplementation(()=>result)
    expect(await service.getEmailSentTasks()).toBe(result)
  })

  it('should get all tasks where email reminder is not sent', async ()=> {
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'getEmailNotSentTasks').mockImplementation(()=>result)
    expect(await service.getEmailNotSentTasks()).toBe(result)
  })
});
