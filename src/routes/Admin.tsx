import { getAuth } from 'firebase/auth';
import React from 'react';

const Admin = () => {
  const auth = getAuth();

  async function handleSignOut() {
    await auth.signOut();
  }

  return (
    <div>
      Admin main page
      <button type="button" onClick={handleSignOut}>
        로그아웃
      </button>
    </div>
  );
};

export default Admin;
