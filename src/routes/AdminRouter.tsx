import { User } from 'firebase/auth';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Auth from './Auth';

interface IProps {
  isLoggedIn: boolean;
  user: User | null;
}

const AdminRouter = ({ isLoggedIn }: IProps) => {
  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<Auth />} />}
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default AdminRouter;
