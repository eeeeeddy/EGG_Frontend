import React, { createContext, useContext, useState } from 'react';

// 사용자 정보를 저장할 초기 상태 객체 생성
const initialUserState = {
  user: null,
  userEmail: '', // 사용자 이메일 상태 추가
  setUser: () => {},
  updateEmail: () => {}, // updateEmail 함수 추가
};

// UserContext를 생성하고 초기 상태를 전달합니다.
const UserContext = createContext(initialUserState);

// UserProvider 컴포넌트를 정의합니다.
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // 초기 사용자 이메일 설정


  // 로그인 상태 업데이트 함수
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // 사용자 이메일을 설정하는 함수 추가
  const updateEmail = (email) => {
    setUserEmail(email);
  };
 

  // UserContext.Provider 컴포넌트로 감싸서 사용자 상태를 하위 컴포넌트에 제공합니다.
  return (
    <UserContext.Provider value={{ user, userEmail, setUser, updateEmail }}>
      {children}
    </UserContext.Provider>
  );
}

// 사용자 상태를 간편하게 사용할 수 있도록 커스텀 훅 생성
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
