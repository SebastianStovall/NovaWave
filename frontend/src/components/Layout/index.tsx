// Layout.tsx
import React from "react";
import { LibrarySidebar } from "../LibrarySidebar/libaray-sidebar";
import { NowPlayingSidebar } from "../NowPlayingSidebar/now-playing-sidebar";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="full-page-layout">

      <div className="content-wrapper">
        <LibrarySidebar />

        <div className="main-content main-border">
          <Header />
          {children}
        </div>

        <NowPlayingSidebar />
      </div>

      <Footer />
    </div>
  );
};
