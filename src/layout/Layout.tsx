import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dracula-background text-white">
      <header className="py-4 px-6 bg-dracula-current flex justify-between items-center">
        <h1 className="text-2xl p-4">My Favorites</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;