import { createHash, randomBytes } from 'crypto';
import { verify } from 'jsonwebtoken';
import { Header } from './header.class';
import { Injectable } from '@nestjs/common';
import { config } from '@app/config';

@Injectable()
export class UtilService {
  private readonly secret: Buffer;
  private readonly tokenRegExp: RegExp = /^Bearer .+$/;

  public constructor() {
    this.secret = config.JWT_SECRET ? Buffer.from(config.JWT_SECRET) : randomBytes(16);
  }

  public encode(content: string): string {
    return createHash(config.ENCRYPTION).update(content).digest('base64');
  }

  public getTokenBody(header: Header): string {
    let token: string;
    if (header.authorization) {
      token = header.authorization;
    } else {
      token = header['x-refresh-token'];
    }

    if (this.tokenRegExp.test(token)) {
      return token.split(' ', 2)[1];
    } else {
      return null;
    }
  }

  public getUsernameByToken(token: string): string {
    try {
      const { id }: { id: string } = verify(token, this.secret, {}) as undefined as { id: string };
      return id;
    } catch (e) {
      return null;
    }
  }
}
