import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import type { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('search')
  search(@Query('q') q: string, @Query('limit') limit?: string) {
    return this.booksService.searchGoogleBooks(q, Number(limit) || 10);
  }

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number): Book | undefined {
  return this.booksService.findOne(id);
}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto): Book {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.booksService.remove(id);
  }
}