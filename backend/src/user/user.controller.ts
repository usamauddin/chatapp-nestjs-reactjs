import { UserLoginDTO } from './dto/user-login.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('/auth')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('/login')
  async login(@Body(ValidationPipe) body: UserLoginDTO, @Res() res: Response) {

    const token = await this.userService.login(body)

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3000000000), //expire in 10 seconds
      sameSite: 'none',
      secure: true
    })
    // all these options must be same in res.cookies and res.clearCookies to add & remove cookies
    res.send({ message: 'loggedin' })
  }


  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const cookies = req.cookies.jwt
    // console.log(cookies)
    if (!cookies) {
      throw new BadRequestException('token not found')
    }
    else {
      res.clearCookie('jwt', { 
        secure: true,
        httpOnly: true,
        sameSite: 'none'
       })
      res.send({ message: 'loggedout' })
    }
  }


  @Get('/all')
  getAll() {
    return this.userService.findAll()
  }


  @Post('/register')
  async register(@Body(ValidationPipe) body: UserRegisterDto) {
    // console.log(body)
    await this.userService.register(body)
    return { message: 'registered' }
  }

  @Get('/get/:email')
  getUserByEmail(@Param('email') email) {
    return this.userService.getUserByEmail(email)
  }


  @Get('/cookies')
  getCookies(@Req() req: Request) {
    const cookies = req.cookies.jwt
    // console.log(cookies)
    return { working: true, cookies }
  }


}
