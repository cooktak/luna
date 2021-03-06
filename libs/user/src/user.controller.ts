import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  InternalServerErrorException,
  Patch,
  Post,
  Put,
  ValidationPipe,
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

  @Patch()
  @ApiOperation({ summary: '회원 수정' })
  @ApiBearerAuth()
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

  @Delete()
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async leave(@Headers() header: Header): Promise<void> {
    try {
      return this.userService.leave(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get()
  @ApiOperation({ summary: '회원 정보 불러오기' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResLoad })
  @ApiForbiddenResponse()
  public async load(@Headers() header: Header): Promise<ResLoad> {
    try {
      return this.userService.load(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiHeader({ name: 'X-Refresh-Token' })
  @ApiOkResponse({ type: ResRefresh })
  @ApiForbiddenResponse()
  public async refresh(@Headers() header: Header): Promise<ResRefresh> {
    try {
      return this.userService.refresh(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('token')
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: ResSignIn })
  @ApiConflictResponse()
  public async signIn(@Body(new ValidationPipe()) payload: SignInDto): Promise<ResSignIn> {
    try {
      return this.userService.signIn(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete('token')
  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async signOut(@Headers() header: Header): Promise<void> {
    try {
      return this.userService.signOut(this.utilService.getTokenBody(header));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Put()
  @ApiOperation({ summary: '회원 가입' })
  @ApiCreatedResponse()
  @ApiConflictResponse()
  public async signUp(@Body(new ValidationPipe()) payload: SignUpDto): Promise<void> {
    try {
      return this.userService.signUp(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
