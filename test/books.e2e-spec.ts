import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  it('/books (POST -> GET)', async () => {
    const createDto = { title: 'E2E', author: 'Tester' };
    const postRes = await request(app.getHttpServer())
      .post('/books')
      .send(createDto)
      .expect(201);
    expect(postRes.body).toMatchObject(createDto);

    const getRes = await request(app.getHttpServer())
      .get('/books')
      .expect(200);
    expect(getRes.body.length).toBeGreaterThan(0);
  });
});