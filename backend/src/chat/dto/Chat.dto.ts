import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class ChatDto {

    @IsArray()
    @ArrayMaxSize(2)
    @ArrayMinSize(2)
    @IsNotEmpty()
    users: [];

}
