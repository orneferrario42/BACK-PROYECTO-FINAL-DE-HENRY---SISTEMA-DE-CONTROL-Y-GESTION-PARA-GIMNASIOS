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
  UseGuards,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuards } from 'src/auth/guards/roles.guards';
@ApiTags('USERS')
@ApiBearerAuth()
@Controller('users')


export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Este metodo permite a los usuarios no registrador inscribir se en la pagina
   */
  @Post('register')
  @Roles(Role.User,Role.Admin)
  // @UseGuards(AuthGuard,RolesGuards)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Este metodo permite al Administrador ver la lista de los usuarios del gimnasio, en el ver quienres estan activos e inactivos
   */
  @Get()
  // @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  // @UseGuards(RolesGuards)
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
  @Roles(Role.Admin)
  // @UseGuards(AuthGuard,RolesGuards)
  updateStatus(@Param('id') id: string){
    console.log(id)
    return this.usersService.updateState(id);
  }

  @Get(':id')
  @Roles(Role.User)
  // @UseGuards(AuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Este metodo le permite al usuario modificar  su informacion personal
   */
  @Put(':id')
  @Roles(Role.Admin,Role.User)
  // @UseGuards(AuthGuard,RolesGuards)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

}
