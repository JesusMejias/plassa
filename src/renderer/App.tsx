import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Welcome from './pages/welcome';
import GetStarted from './pages/getstarted';
import Calendar from './pages/calendar/index';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        delete: (key: string) => void;
      };
    };
  }
}

export default function App() {
  const store = window.electron.store;
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/calendar" element={<Calendar store={store} />} />
    </Routes>
  );
}
