import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // Hide header & footer on /auth

  return (
    <div>
      {!hideLayout && <Header />}
      <main className="overflow-auto">
        <div className="py- 4">
          <Outlet />
        </div>
      </main>
      {!hideLayout && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}
