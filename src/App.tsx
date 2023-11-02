import { ToastContainer } from 'react-toastify';
import './App.css';
import { Layout } from './components';
import { Router } from './Router';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="App bg-neutral-bg min-h-screen">
      <Layout>
        <Router />
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
