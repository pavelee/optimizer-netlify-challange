import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = {
    title: {
        template: '%s | Netlify',
        default: 'Image Optimizer'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="lofi">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <AntdRegistry>
                <body className="antialiased">
                    <div className="flex flex-col min-h-screen px-6 bg-grid-pattern sm:px-12">
                        <div className="flex flex-col w-full max-w-5xl mx-auto grow p-4">
                            {/* <Header /> */}
                            <div className="grow">{children}</div>
                            {/* <Footer /> */}
                        </div>
                    </div>
                </body>
            </AntdRegistry>
        </html>
    );
}
