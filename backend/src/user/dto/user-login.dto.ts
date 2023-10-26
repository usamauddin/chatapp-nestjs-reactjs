import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRegisterDto } from './user-register.dto';


export class UserLoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    // @IsString()
    password: string;
}