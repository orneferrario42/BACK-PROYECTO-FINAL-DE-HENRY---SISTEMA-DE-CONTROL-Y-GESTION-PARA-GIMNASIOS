import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@ApiTags('USERS')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Este metodo permite a los usuarios no registrador inscribir se en la pagina
   */
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Este metodo permite al Administrador ver la lista de los usuarios del gimnasio, en el ver quienres estan activos e inactivos
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  /**
   * Este metodo permite a un usuario verla informacion de su perfil
   */

  @Get('auth0')
  getAuth0(@Req() req: Request) {
    return JSON.stringify(req.oidc.user); 
  }

  @Post('exist')
  userExist(@Body() data): Promise<boolean> {
    const {email} = data
    return this.usersService.findUserByEmail(email)
  }


  @Put('updateState/:id')
  updateStatus(@Param('id') id: string){
    return this.usersService.updateState(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Este metodo le permite al usuario modificar  su informacion personal
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

}
