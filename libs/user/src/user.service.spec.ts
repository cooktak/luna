import { EditDto, SignUpDto } from './dto';
import { ResLoad, ResRefresh, ResSignIn } from './res';
import { Test, TestingModule } from '@nestjs/testing';
import { TestUtilModule, TestUtilService } from '@app/test-util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UtilModule } from '@app/util';
import { config } from '@app/config';
import { entities } from '@app/entity';
import { getConnection } from 'typeorm';

describe('UserService', () => {
  const testUser: SignUpDto = {
    birthday: new Date().toISOString(),
    gender: 'M',
    nickname: 'testUser',
    password: 'testUser',
    username: 'testUser',
  };
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestUtilModule,
        TypeOrmModule.forRoot({ ...config.ormConfig, entities }),
        TypeOrmModule.forFeature(entities),
        UserModule, UtilModule,
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should success signUp()', async () => {
    await service.signUp(testUser);
    const { accessToken }: ResSignIn = await service.signIn({
      password: testUser.password, username: testUser.username,
    });

    await expect(service.signUp(testUser)).rejects.toThrow();

    const foundUser: ResLoad = await service.load(accessToken);

    expect(new Date(testUser.birthday).toDateString()).toEqual(foundUser.birthday.toDateString());
    const [req, res] = TestUtilService.make_comparable(testUser, foundUser, [
      'birthday', 'createTime', 'password', 'userTag',
    ]);
    expect(req).toStrictEqual(res);

    await service.leave(accessToken);
  });

  it('should success edit()', async () => {
    const user: { username: string } = { username: `${testUser.username}_2` };
    await service.signUp({ ...testUser, ...user });
    const { accessToken }: ResSignIn = await service.signIn({
      password: testUser.password, username: user.username,
    });

    await expect(service.edit(accessToken, { password: 'notSuccess' })).rejects.toThrow();

    const editData: EditDto = {
      birthday: new Date().toISOString(),
      gender: 'F',
      newPassword: `${testUser.password}_2`,
      nickname: `${testUser.nickname}_2`,
      password: testUser.password,
    };

    await service.edit(accessToken, { ...editData });

    const foundUser: ResLoad = await service.load(accessToken);

    expect(new Date(editData.birthday).toDateString()).toEqual(foundUser.birthday.toDateString());
    const [req, res] = TestUtilService.make_comparable(editData, foundUser, [
      'birthday', 'createTime', 'newPassword', 'password', 'username', 'userTag',
    ]);
    expect(req).toStrictEqual(res);

    await service.signIn({ ...user, password: editData.newPassword });

    await service.leave(accessToken);
  });

  it('should success refresh()', async () => {
    const user: { username: string } = { username: `${testUser.username}_3` };
    await service.signUp({ ...testUser, ...user });
    const { refreshToken }: ResSignIn = await service.signIn({
      password: testUser.password, username: user.username,
    });

    const { accessToken }: ResRefresh = await service.refresh(refreshToken);

    await service.leave(accessToken);
  });

  it('should success signOut()', async () => {
    const user: { username: string } = { username: `${testUser.username}_4` };
    await service.signUp({ ...testUser, ...user });
    const { accessToken, refreshToken }: ResSignIn = await service.signIn({
      password: testUser.password, username: user.username,
    });

    await service.signOut(accessToken);
    await expect(service.refresh(refreshToken)).rejects.toThrow();

    await service.leave(accessToken);
  });
});
