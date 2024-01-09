// Layout.tsx
import React, { useEffect } from "react";
import styles from './layout.module.css'
import { LibrarySidebar } from "../LibrarySidebar/librarySidebar";
import { NowPlayingSidebar } from "../NowPlayingSidebar/nowPlayingSidebar";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { useAppSelector } from "../../hooks";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSidebarActive = useAppSelector(state => state.sidebar.active)

  useEffect(() => {
    localStorage.setItem('nowPlayingSidebarState', JSON.stringify(isSidebarActive));
  }, [isSidebarActive]);

  return (
    <div className={styles.fullPageLayout}>

      <div className={styles.contentWrapper}>
        <LibrarySidebar />

        <div className={isSidebarActive ? styles.mainContent : styles.mainContentNoRightSidebar}>
          <Header />
          {children}
        </div>

        {isSidebarActive && <NowPlayingSidebar />}
      </div>

      <Footer />
    </div>
  );
};
