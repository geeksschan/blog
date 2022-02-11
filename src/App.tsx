import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './fbase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Home from './routes/Home';
import Auth from './routes/Auth';
import AppRouter from './routes/AppRouter';

const auth = getAuth();

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>{!init ? 'loading...' : <AppRouter isLoggedIn={isLoggedIn} user={user} />}</>;
}

export default App;
