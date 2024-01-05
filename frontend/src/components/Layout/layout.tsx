// Layout.tsx
import React from "react";
import styles from './layout.module.css'
import { LibrarySidebar } from "../LibrarySidebar/librarySidebar";
import { NowPlayingSidebar } from "../NowPlayingSidebar/nowPlayingSidebar";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.fullPageLayout}>

      <div className={styles.contentWrapper}>
        <LibrarySidebar />

        <div className={styles.mainContent}>
          <Header />
          {children}
        </div>

        <NowPlayingSidebar />
      </div>

      <Footer />
    </div>
  );
};
