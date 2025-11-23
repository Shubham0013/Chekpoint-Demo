import { useEffect, useState } from "react";

export function useFetch() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.github.com/repositories?since=100",
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const response = await res.json();
        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, loading, error };
}
