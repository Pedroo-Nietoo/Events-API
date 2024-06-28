import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Creates a user',
    description: 'Creates a user on the platform',
  })
  @ApiCreatedResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'E-mail already registered',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiQuery({
    name: 'role',
    enum: Role,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Query('role') role: Role) {
    return this.userService.create(createUserDto, role);
  }

  @ApiOperation({
    summary: 'Lists all users',
    description: 'Lists all users on the platform',
  })
  @ApiParam({
    name: 'page',
    description: 'Users list page',
    schema: { default: 1 },
  })
  @ApiOkResponse({
    status: 200,
    description: 'Users information listed successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Lists a specific user',
    description: 'Lists a specific user on the platform',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User information listed successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Updates a user information',
    description: 'Updates a user information on the platform',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User information updated successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'E-mail already registered',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Removes a user',
    description: 'Removes a user from the platform',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User removed successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
