import { useState, useEffect } from 'react';
import { Signup } from './components/account/Signup';
import { Login } from './components/account/Login';
import { Landing } from './components/Landing';
import { Details } from './components/details/Details';
import { UserProvider } from './components/context/Context';
import { Home } from './components/home/Home';
import { UpdatePost } from './components/create/update';
import { CreatePost } from './components/create/CreatePost';
import { About } from './components/about/About';
import { Contact } from './components/contact/contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Privateroute} from './components/Privateroute'; 
import { Bypassroute } from './components/Privateroute';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Bypassroute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          </Route>
          
          <Route element={<Privateroute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

