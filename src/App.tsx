import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Sidebar from "./components/SideBar";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import './App.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  interface MainPageProps {
    className: string;
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
  }

  const MainPageWithProps: React.FC<Partial<MainPageProps>> = (props) => (
    <MainPage
      className={'main-content'}
      isSidebarCollapsed={isSidebarCollapsed}
      toggleSidebarCollapse={toggleSidebarCollapse}
      {...props}
    />
  );

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <div className="App dark:bg-gray-900 dark:text-gray-100">
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? (
              <div className="flex">
                <Sidebar
                  className="sidebar-container flex-shrink-0"
                  isSidebarCollapsed={isSidebarCollapsed}
                  toggleSidebarCollapse={toggleSidebarCollapse}
                />
                <MainPageWithProps />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )} />
            <Route path="/c/:id" element={isAuthenticated ? <MainPageWithProps /> : <Navigate to="/login" replace />} />
            <Route path="/g/:gid" element={isAuthenticated ? <MainPageWithProps /> : <Navigate to="/login" replace />} />
            <Route path="/g/:gid/c/:id" element={isAuthenticated ? <MainPageWithProps /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </I18nextProvider>
    </BrowserRouter>
  );
};

export default App;