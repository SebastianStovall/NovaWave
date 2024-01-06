import React from "react";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import styles from "./nowPlayingSidebar.module.css";

export const NowPlayingSidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("right");

    return (
        <div className={styles.resizableSidebarContainer}>
            <div className={styles.resizebar} onMouseDown={handleMouseDown}></div>
            <div className={styles.resizableSidebar} style={{ width: sidebarWidth }}>

            </div>
        </div>
    );
};
