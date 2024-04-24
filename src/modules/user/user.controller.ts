import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user-service.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@bases/pagination/pagination.dto';
import { User } from './entities/user.entity';
import { ApiPaginatedResponse } from '@decorators/api-paginated-response.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { RolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/roles.decorator';
import { RoleEnum } from '@enums/index';
import {
  ApiCustomBadRequestResponse,
  ApiCustomConflictResponse,
  ApiCustomCreatedResponse,
  ApiCustomForbiddenResponse,
  ApiCustomOkResponse,
  ApiCustomUnauthorizedResponse,
} from '@decorators/index';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create user' })
  @ApiCustomCreatedResponse({
    message: 'User created successfully',
  })
  @ApiCustomBadRequestResponse()
  @ApiCustomUnauthorizedResponse()
  @ApiCustomForbiddenResponse()
  @ApiCustomConflictResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Find all users' })
  @ApiPaginatedResponse({ type: User })
  @ApiCustomUnauthorizedResponse()
  @ApiCustomForbiddenResponse()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Find one user',
  })
  @ApiCustomOkResponse({ type: User })
  @ApiCustomUnauthorizedResponse()
  @ApiCustomForbiddenResponse()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiCustomOkResponse({ type: User })
  @ApiCustomUnauthorizedResponse()
  @ApiCustomForbiddenResponse()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Remove user',
  })
  @ApiCustomOkResponse({
    type: { message: 'User removed successfully' },
    description: 'User removed successfully',
  })
  @ApiCustomUnauthorizedResponse()
  @ApiCustomForbiddenResponse()
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
