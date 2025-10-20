import Topbar from '@/components/ui/Topbar';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '@/lib/providers';

export const metadata = {
  title: 'GitHub Hub - Perfis Favoritos',
  description: 'Encontre e gerencie seus perfis favoritos do GitHub.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>      
      <body className="dark">
        <Providers>
        <Topbar/>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        </Providers>
      </body>
    </html>
  )
}