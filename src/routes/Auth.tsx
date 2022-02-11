import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [isLoginType, setIsLoginType] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();

  function initForm() {
    setEmail('');
    setPassword('');
    setPasswordRe('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoginType) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`${errorCode}: ${errorMessage}`);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`${errorCode}: ${errorMessage}`);
        });
    }

    initForm();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'password_re') {
      setPasswordRe(value);
    }
  }

  function handleChangeType() {
    setIsLoginType(!isLoginType);
    initForm();
  }

  useEffect(
    function checkPasswordValidator() {
      if (password && passwordRe && password !== passwordRe) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    },
    [password, passwordRe]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="패스워드를 입력해주세요."
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        {!isLoginType && (
          <div>
            <label htmlFor="password_re">패스워드 재입력</label>
            <input
              id="password_re"
              type="password"
              name="password_re"
              placeholder="패스워드를 다시 입력해주세요."
              onChange={handleChange}
              value={passwordRe}
              required
            />
          </div>
        )}
        <button type="button" onClick={handleChangeType}>
          {isLoginType ? '회원가입 하기' : '로그인 하기'}
        </button>
        {error && <p>{error}</p>}
        <div>
          <button type="submit">{isLoginType ? '로그인' : '회원가입'}</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
