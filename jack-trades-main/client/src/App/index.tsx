import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { AuthContextProvider } from '../components/Context/AuthContext';
import './style.css';

const App = () => (
  <div>
    <AuthContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthContextProvider>
  </div>
);

export default App;
