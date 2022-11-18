import { DataSource } from "typeorm";
import { Task } from "./task/task.entity";

export const AppDataSource= new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'taskmanagement',
    entities:[Task],
    synchronize:true

})

AppDataSource.initialize()