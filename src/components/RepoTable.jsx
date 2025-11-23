import { useState, useMemo } from "react";
import styles from "./RepoTable.module.css";
import { useTheme } from "../context/useTheme";
import { useFetch } from "../hooks/useFetch";

export default function RepoTable() {
  const { theme } = useTheme();
  const { data, error, loading } = useFetch(
    "https://api.github.com/users/facebook/repos",
  );

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const containerClass =
    theme === "light" ? styles.containerLight : styles.containerDark;

  const filteredRepos = useMemo(() => {
    let result = data;

    // Search filter
    if (search.trim()) {
      result = result.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort by name only
    result = [...result].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    return result;
  }, [data, search, sortOrder]);
  if (error) return <p>{error}</p>;
  if (loading) return <p>...Loading</p>;
  return (
    <div className={`${containerClass} ${styles.fullPage}`}>
      <h2>Repositories</h2>

      {/* SEARCH + SORT */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.select}
        >
          <option value="asc">Accending</option>
          <option value="desc">Decending</option>
        </select>
      </div>

      <table className={styles.table}>
        <tbody>
          {filteredRepos.map((repo) => (
            <tr
              key={repo.id}
              className={theme === "light" ? styles.row : styles.darkRow}
            >
              <td className={styles.cell}>{repo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
