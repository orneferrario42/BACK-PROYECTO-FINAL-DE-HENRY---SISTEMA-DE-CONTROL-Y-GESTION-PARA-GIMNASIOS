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
  Query,
  Res,
  ParseIntPipe,
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
import { Response } from 'express';
@ApiTags('USERS')
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
  async findAll(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    if (page && limit) {
      const users = await this.usersService.findAll(page, limit);
      const metadata = await this.usersService.getMetadata(limit);
      const toReturn = { users, metadata };
      return toReturn;
    }
    return this.usersService.findAll(1, 5);
  }

  /**
   * Este metodo permite al usuario ingresar con una cuenta externa de google entre otras...
   */

  @Get('auth0')
  getAuth0(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }
  /***
   *Este metodo verifica si el usuario  existe
   */
  @Post('exist')
  userExist(@Body() data): Promise<boolean> {
    const { email } = data;
    return this.usersService.findUserByEmail(email);
  }
  /***
   * Ese metodo permite a admin activar o desactivar un usuaruio
   */
  @Put('updateState/:id')
  updateStatus(@Param('id') id: string) {
    console.log(id);
    return this.usersService.updateState(id);
  }

  /***
   * Este metodo le permite al usuario ver su informacion personal
   */
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
  /***
   * Este metodo permite generar el QR cuando el usuario paga la mensualidad
   */
  @Get('generaqr/:id')
  generaqr(@Param('id') id: string) {
    return this.usersService.generaqr(id);
  }
}
