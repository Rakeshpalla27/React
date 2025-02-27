import { useState, useEffect } from "react";
export const key = "4735bdc2";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      async function fetchMovies() {
        setIsloading(true);
        setError("");
        try {
          const res =
            await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}
            `);
          if (!res.ok)
            throw new Error("Something went wrong while fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsloading(false);
        } catch (err) {
          setError(err.message ? err.message : " Movie not found!");
        } finally {
          setIsloading(false);
        }
      }
      if (query.length === 0) {
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovies();
    },
    [query]
  );
  return { movies, isloading, error };
}
