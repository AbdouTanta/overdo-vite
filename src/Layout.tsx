import { ReactNode } from 'react';
import Navbar from './components/global/Navbar';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-slate-200">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
