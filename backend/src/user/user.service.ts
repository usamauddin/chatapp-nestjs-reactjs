import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { UserDocument, UserModel } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private user: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    // console.log(user)
  }

  async register(body) {

    const user = await this.user.findOne({ email: body.email })

    if (user) {
      throw new ServiceUnavailableException('User already exsist.')
    }
    else {
      await this.user.create(body)
    }
  }


  async login(body) {

    const user = await this.user.findOne({ email: body.email })
    if (!user) {
      throw new NotFoundException('User not found.')
    }

    const result = await bcrypt.compare(body.password, user.password)

    if (!result) {
      throw new BadRequestException('Email or password is incorrect.')
    }

    else {
      const payload = { sub: user.password, username: user.name }
      const token = await this.jwtService.signAsync(payload)
      // console.log(token)
      return token
    }

  }

  async findOne(id) {
    return await this.user.findById(id)
  }

  async findAll() {
    return await this.user.find()
  }

  async getUserByEmail(email) {
    return await this.user.findOne({ email })
  }



}
