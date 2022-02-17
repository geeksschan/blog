import { v4 as uuidv4 } from 'uuid';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';

const Article = ({}) => {
  const db = getFirestore();
  const storage = getStorage();

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bucketName = uuidv4() + Date.now();
    const storageRef = ref(storage, `articles/${bucketName}`);
    const response = await uploadString(storageRef, file, 'data_url');
    const storagePath = response.ref.fullPath;
    const downloadUrl = await getDownloadURL(response.ref);
    try {
      const docRef = await addDoc(collection(db, 'articles'), {
        title: title,
        subTitle: subTitle,
        content: content,
        storage_path: storagePath,
        thumbnail_url: downloadUrl,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'sub-title') {
      setSubTitle(value);
    }
    if (name === 'article-content') {
      setContent(value);
    }
    if (name === 'article-thumbnail') {
      const {
        target: { files },
      } = event;
      if (files) {
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            const {
              target: { result },
            } = event;
            if (typeof result === 'string') {
              setFile(result);
            }
          }
        };
        reader.readAsDataURL(theFile);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleChange}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="sub-title">부제목</label>
        <input
          id="sub-title"
          type="text"
          name="sub-title"
          placeholder="부제목을 입력해주세요."
          onChange={handleChange}
          value={subTitle}
        />
      </div>
      <div>
        <label htmlFor="article-content">내용</label>
        <input
          id="article-content"
          type="text"
          name="article-content"
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
          value={content}
        />
      </div>
      <div>
        <label htmlFor="article-thumbnail">파일</label>
        <input
          id="article-thumbnail"
          type="file"
          name="article-thumbnail"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <img src={file} />
      {/* thumbnail image upload */}
      {/* youtube url */}
      {/* tag list */}
      <button type="submit">생성하기</button>
    </form>
  );
};

export default Article;
