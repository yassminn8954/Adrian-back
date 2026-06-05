import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  // ── Google Books ──────────────────────────────────────────
  async searchGoogleBooks(query: string, maxResults = 10) {
    if (!query) {
      throw new HttpException("Parâmetro 'q' é obrigatório", HttpStatus.BAD_REQUEST);
    }

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const items = data.items ?? [];

    return {
      total: items.length,
      books: items.map((item: any) => {
        const info = item.volumeInfo;
        return {
          id: item.id,
          title: info.title ?? 'Sem título',
          authors: info.authors ?? ['Autor desconhecido'],
          description: info.description ?? '',
          thumbnail: info.imageLinks?.thumbnail ?? '',
          publishedDate: info.publishedDate ?? '',
          pageCount: info.pageCount ?? 0,
          categories: info.categories ?? [],
          isbn: info.industryIdentifiers?.find((i: any) => i.type === 'ISBN_13')?.identifier ?? '',
        };
      }),
    };
  }

  // ── CRUD local ────────────────────────────────────────────
  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
  return this.books.find(b => b.id === id);
}

  create(dto: CreateBookDto): Book {
    const book = { id: this.nextId++, ...dto } as Book;
    this.books.push(book);
    return book;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const index = this.books.findIndex(b => b.id === id);
    this.books[index] = { ...this.books[index], ...dto };
    return this.books[index];
  }

  remove(id: number): void {
    this.books = this.books.filter(b => b.id !== id);
  }
}