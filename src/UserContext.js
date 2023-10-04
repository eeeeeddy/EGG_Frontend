import React, { createContext, useContext, useState } from 'react';

const initialUserState = {
  user: null,
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

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
