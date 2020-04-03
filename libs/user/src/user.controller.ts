import {
  ApiConflictResponse, ApiForbiddenResponse,
  ApiHeader, ApiOkResponse, ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body, Controller, Delete, Get, Headers,
  Inject, InternalServerErrorException,
  Patch, Post, ValidationPipe,
} from '@nestjs/common';
import { EditDto, SignInDto, SignUpDto } from './dto';
import { Header, UtilService } from '@app/util';
import { ResLoad, ResRefresh, ResSignIn } from './res';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly utilService: UtilService;

  @Patch('edit')
  @ApiOperation({ summary: '회원 수정' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async edit(
    @Headers() header: Header,
    @Body(new ValidationPipe()) payload: EditDto,
  ): Promise<void> {
    try {
      return this.userService.edit(this.utilService.getTokenBody(header), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('load')
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async load(@Headers() header: Header): Promise<ResLoad> {
    try {
      return this.userService.load(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete('leave')
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async leave(@Headers() header: Header): Promise<void> {
    try {
      return this.userService.leave(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiHeader({ name: 'X-Refresh-Token' })
  @ApiOkResponse()
  public async refresh(@Headers() header: Header): Promise<ResRefresh> {
    try {
      return this.userService.refresh(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('signUp')
  @ApiOperation({ summary: '회원가입' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiConflictResponse()
  public async signUp(@Body(new ValidationPipe()) payload: SignUpDto): Promise<void> {
    try {
      return this.userService.signUp(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('signIn')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse()
  @ApiConflictResponse()
  public async signIn(@Body(new ValidationPipe()) payload: SignInDto): Promise<ResSignIn> {
    try {
      return this.userService.signIn(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
