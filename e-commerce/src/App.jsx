import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/admin/Notfound';
import { Adminhome } from './components/admin/Adminhome';
import { Mynav } from './components/admin/Mynav';
import Footer from './components/admin/Footer';

function App() {
  return (
    <div className="App">
      <Mynav />
        <Routes>
          <Route path='admin/home' element={<Adminhome/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
