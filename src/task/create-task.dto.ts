import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title : string;

    @IsString()
    @IsNotEmpty()
    description :string;

    @IsEmail()
    assignedPerson :string;

    @IsDateString()
    reminderDate: string;
}