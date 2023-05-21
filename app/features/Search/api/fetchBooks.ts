import { useQuery } from "react-query";

const fetchBooks = async (searchTerm:string) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=15`
  );
  const data = await response.json();
  return data;
};

export const useSearchBooks = (searchTerm: string) =>
  useQuery(["search", searchTerm], ()=>fetchBooks(searchTerm));
