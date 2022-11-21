import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TasksRepository } from './tasks.repository';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository: TasksRepository;
  let createTaskDto:CreateTaskDto ={
    title:'groceries',
    description:'milk',
    assignedPerson: 'mohdaafrin@gmail.com',
    reminderDate: 'some date'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TasksRepository],
    }).compile();

    service = module.get<TaskService>(TaskService);
    mockRepository = module.get<TasksRepository>(TasksRepository)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create task',async () =>{
    let result : Promise<Task>
    jest.spyOn(mockRepository,'CreateTask').mockImplementation(()=> result)
    expect(await service.createTask(createTaskDto)).toBe(result)
   
  })

  it('should fetch all tasks from repository' , async ()=>{
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'ViewAllTasks').mockImplementation(()=>result)
    expect( await service.viewAllTask()).toBe(result)
  })

  it('should get all tasks where email reminder is sent', async ()=> {
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'GetEmailSentTasks').mockImplementation(()=>result)
    expect(await service.getEmailSentTasks()).toBe(result)
  })

  it('should get all tasks where email reminder is not sent', async ()=> {
    let result : Promise<{items:Task[]}>
    jest.spyOn(mockRepository,'GetEmailNotSentTasks').mockImplementation(()=>result)
    expect(await service.getEmailNotSentTasks()).toBe(result)
  })
});
