import Topbar from '@/components/ui/Topbar';
import './globals.css';

export const metadata = {
  title: 'Meu Site',
  description: 'Descrição do site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>      
      <body className="dark">
        <Topbar/>
        {children}
      </body>
    </html>
  )
}