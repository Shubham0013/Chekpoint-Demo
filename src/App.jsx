import { ThemeProvider } from "./context/ThemeProvider";
import RepoTable from "./components/RepoTable";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <RepoTable />
    </ThemeProvider>
  );
}

export default App;
