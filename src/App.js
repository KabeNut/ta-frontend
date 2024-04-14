import RouterView from './router/router';
import { WindowProvider } from "./context/WindowContext.js";
import './App.css';

function App() {
  return (
    <WindowProvider>
      <main className="main">
        <RouterView />
      </main>
    </WindowProvider>
  );
}

export default App;
