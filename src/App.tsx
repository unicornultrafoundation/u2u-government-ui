import './App.css';
import { Layout } from './components';
import { Router } from './Router';


function App() {
  return (
    <div className="App">
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
