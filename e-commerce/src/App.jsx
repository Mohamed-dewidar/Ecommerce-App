import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/admin/Notfound';
import { Adminhome } from './pages/admin/Adminhome';
import { Mynav } from './components/admin/Mynav';
import { Products } from './pages/admin/Products';
import Footer from './components/admin/Footer';

function App() {
  return (
    <div className="App">
      <Mynav />
        <Routes>
          <Route path='admin/home' element={<Adminhome/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='*' element={<NotFound/>} />
          {/* <Route path='admin/products/:id' element={<ProductDetails />} /> */}
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
