import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

if (!API_KEY) {
  throw new Error("GOOGLE_BOOKS_API_KEY não foi definido no backend");
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  isbn: string;
}

export async function searchBooks(
  query: string,
  maxResults = 10
): Promise<Book[]> {
  const response = await axios.get(BASE_URL, {
    params: {
      q: query,
      maxResults,
      key: API_KEY,
    },
  });

  const items = response.data.items ?? [];

  return items.map((item: any) => {
    const info = item.volumeInfo;
    const isbn =
      info.industryIdentifiers?.find((i: any) => i.type === "ISBN_13")
        ?.identifier ?? "";

    return {
      id: item.id,
      title: info.title ?? "Sem título",
      authors: info.authors ?? ["Autor desconhecido"],
      description: info.description ?? "",
      thumbnail: info.imageLinks?.thumbnail ?? "",
      publishedDate: info.publishedDate ?? "",
      pageCount: info.pageCount ?? 0,
      categories: info.categories ?? [],
      isbn,
    };
  });
}