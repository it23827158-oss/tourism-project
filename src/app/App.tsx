import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './context/UserContext';
import { TranslationProvider } from './context/TranslationContext';

export default function App() {
  return (
    <TranslationProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </TranslationProvider>
  );
}
