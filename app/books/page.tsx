"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  checked: boolean;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  // Get all books from the database
  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      console.log(data);
      setBooks(data);
    };
    getBooks();
  }, []);

  const handleCheck = (index: number) => {
    const newBooks = [...books];
    newBooks[index].checked = !newBooks[index].checked;
    setBooks(newBooks);
  };

  const handleDelete = async (book: Book) => {
    try {
      const res = await fetch(`/api/delete-book/${book.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Book deleted successfully");
        const newBooks = books.filter((b: Book) => b.id !== book.id);
        setBooks(newBooks);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const handleEdit = async (book: Book) => {
    router.push(`/books/edit?id=${book.id}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mt-20">Books List</h1>
      <ul className="flex flex-col">
        {books.length === 0 && <p className="text-2xl mt-10">No books to show.</p>}
        {books.map((book: Book, index: number) => (
          <div
            key={book.id}
            className="text-2xl max-w-xl flex items-center bg-gray-100 p-3 rounded-lg gap-4 my-10">
            <input
              type="checkbox"
              onClick={() => handleCheck(index)}
            />
            <li
              className="font-bold"
              key={book.id}>
              {book.title}
            </li>
            <li>{book.author}</li>

            <button
              className=" text-xs text-gray-900 leading-7 hover:text-gray-900/70"
              disabled={!book.checked}
              onClick={() => handleDelete(book)}>
              {book.checked ? "Delete" : ""}
            </button>
            <button
              disabled={!book.checked}
              className="text-xs text-gray-900 hover:text-gray-900/70"
              onClick={() => handleEdit(book)}>
              {book.checked ? "Edit Book" : ""}
            </button>
          </div>
        ))}
      </ul>
      <div>
        <button
          className="text-gray-900 leading-7 mt-4 underline hover:text-gray-900/70"
          onClick={() => router.push("/create-post")}>
          Create New Book
        </button>
      </div>
    </div>
  );
};
export default BooksPage;
