import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGoogleBooksApiKey(): { apiKey: string } {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    if (!apiKey) {
      throw new Error('GOOGLE_BOOKS_API_KEY não está definido no backend');
    }

    return { apiKey };
  }
}
