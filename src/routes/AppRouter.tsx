import { User } from 'firebase/auth';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import Home from './Home';

interface IProps {
  isLoggedIn: boolean;
  user: User | null;
}

const AppRouter = ({ isLoggedIn, user }: IProps) => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminRouter isLoggedIn={isLoggedIn} user={user} />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
