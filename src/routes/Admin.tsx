import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';

const db = getFirestore();

const Admin = () => {
  const [articles, setArticles] = useState<any>();

  const auth = getAuth();

  async function handleSignOut() {
    await auth.signOut();
  }

  async function getInit() {
    const q = query(collection(db, 'articles'), limit(1));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    setArticles(querySnapshot);
  }

  useEffect(() => {
    getInit();
    // setArticles([1, 2, 3, 4]);
  }, []);

  return (
    <div>
      Admin main page
      <Link to="/admin/article">포스트 작성</Link>
      <button type="button" onClick={handleSignOut}>
        로그아웃
      </button>
      {articles ? (
        <div>
          {articles.forEach((doc: any) => {
            console.log(doc);
            // console.log(doc.id, ' => ', doc.data());
            return <span>hello</span>;
          })}
          <span>hello</span>
        </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default Admin;
