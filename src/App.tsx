import Playing from "./components/Playing";
import Results from "./components/Results";
import Config from "./components/Config";
import { useAppStore } from "./lib/store/appStore";

function App() {

  const { page } = useAppStore();

  if (page === "config") return <Config />;
  else if (page === "playing") return <Playing />
  else if (page === "results") return <Results />;
}

export default App;