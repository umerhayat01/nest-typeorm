import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    console.log('This action adds a new user');
    return this.userRepository.save(newUser);
  }

  findAll() {
    console.log(`This action returns all users`);
    return this.userRepository.find();
  }

  findOne(id: number) {
    console.log(`This action returns a #${id} user`);
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.userRepository.save({ ...user, ...updateUserDto });

    //Alternative
    // return this.userRepository.update(id,updateUserDto)
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    const user = await this.findOne(id);

    return this.userRepository.remove(user);

    //Alternative
    // return this.userRepository.delete(id)
  }
}
