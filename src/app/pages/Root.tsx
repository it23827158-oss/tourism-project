import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
