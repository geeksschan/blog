import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const Admin = () => {
  const auth = getAuth();

  async function handleSignOut() {
    await auth.signOut();
  }

  async function getInit() {
    const q = query(collection(db, 'articles'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  }

  useEffect(() => {
    getInit();
  });

  return (
    <div>
      Admin main page
      <Link to="/admin/article">포스트 작성</Link>
      <button type="button" onClick={handleSignOut}>
        로그아웃
      </button>
    </div>
  );
};

export default Admin;
