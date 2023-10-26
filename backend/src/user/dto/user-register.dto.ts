import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    // @IsString()
    password: string;
    
}
