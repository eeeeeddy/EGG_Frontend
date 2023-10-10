import React, { createContext, useState, useContext, useEffect } from 'react';
// UserContext.js 파일 상단에 Firebase 모듈을 import합니다.
import firebase from 'firebase/compat/app'; // compat를 추가하여 이전 버전의 Firebase와 호환성을 유지합니다.
import 'firebase/compat/auth'; // 필요한 다른 Firebase 모듈도 가져옵니다.


export function useUser() {
  return useContext(UserContext);
}

const initialUserState = {
  user: '',
  userEmail: '',
  selectedPapers: [],
  history: [],
  setUser: () => {},
  updateEmail: () => {},
  updateSelectedPapers: () => {},
  updateHistory: () => {},
};

const UserContext = createContext(initialUserState);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Firebase 초기화 코드

    // Firebase에서 현재 로그인한 사용자 가져오기
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 로그인한 사용자가 있다면 이메일 가져오기
        setUserEmail(user.email || ''); // 로그인한 사용자의 이메일을 가져와 userEmail 상태 업데이트
      } else {
        // 로그인한 사용자가 없다면 이메일 빈 문자열로 설정
        setUserEmail('');
      }
    });

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
      unsubscribe();
    };
  }, []); // 이펙트는 한 번만 실행

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const updateEmail = (email) => {
    setUserEmail(email);
  };

  const updateSelectedPapers = (papers) => {
    setSelectedPapers(papers);
  };

  const updateHistory = (historyItem) => {
    console.log('Updating history with:', historyItem);
    setHistory((prevHistory) => [...prevHistory, historyItem]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userEmail,
        selectedPapers,
        history,
        setUser: updateUser,
        updateEmail,
        updateSelectedPapers,
        updateHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);

export default UserProvider;
