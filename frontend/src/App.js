import "./App.css"
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./pages/home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData)
  
  return (
    <div>
      <Navbar/>
      <div className="App">
        <div className="blur" style={{top: '0', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
          <Routes>
          <Route path="/" element={user ? <Home/> : <Auth/>}/>
          <Route path="/auth" element={<Auth/>}/>

          <Route path="/contact" element={user ? <Contact /> : <Auth/>} />
          <Route path="/about" element={user ? <About /> : <Auth/>} />
        </Routes>


      </div>

    </div>
  );
}

export default App;
