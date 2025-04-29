'use client';
import Navbar from './components/NavBar';
import Footer from './components/Footer'
import { Provider } from "react-redux";
import store from "./utils/store/store";
import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// });

// export const metadata = {
//   title: "My Awesome Dev App",
//   description: "A simple login system built with Next.js and Express",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full" >
      <Provider store={store}>
      <Navbar/>
        {children}
        <Footer/>
        </Provider>
      </body>
    </html>
  );
}
