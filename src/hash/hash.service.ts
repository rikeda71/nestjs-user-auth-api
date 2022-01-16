import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly SALT_ON_HASH = 10;

  encrypt(data: string): string {
    const salt = genSaltSync(this.SALT_ON_HASH);
    return hashSync(data, salt);
  }

  compare(original: string, encrypted: string): boolean {
    return compareSync(original, encrypted);
  }
}
