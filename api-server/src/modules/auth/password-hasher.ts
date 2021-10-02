import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordHasher {
  async hash(text: string): Promise<string> {
    const saltOrRounds = 10;
    return await hash(text, saltOrRounds);
  }

  async equal({ plain, hashed }: { plain: string; hashed: string }) {
    return await compare(plain, hashed);
  }
}
