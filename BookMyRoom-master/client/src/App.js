import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import BookingScreen from './screens/BookingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';


function App() {
    return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen/>} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/admin" element={<AdminScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
