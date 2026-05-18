import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates and retrieves a book', () => {
    const dto: CreateBookDto = { title: 'Test', author: 'Author' };
    const book = service.create(dto);
    expect(book.id).toBeDefined();
    expect(service.findAll()).toHaveLength(1);
    expect(service.findOne(book.id)).toEqual(book);
  });

  it('updates a book', () => {
    const dto: CreateBookDto = { title: 'Old', author: 'Author' };
    const book = service.create(dto);
    const updated = service.update(book.id, { title: 'New' });
    expect(updated.title).toBe('New');
  });

  it('removes a book', () => {
    const dto: CreateBookDto = { title: 'Delete', author: 'Author' };
    const book = service.create(dto);
    service.remove(book.id);
    expect(() => service.findOne(book.id)).toThrow();
  });
});