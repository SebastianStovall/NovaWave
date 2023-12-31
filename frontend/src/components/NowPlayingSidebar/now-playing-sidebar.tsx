import React from "react";
import { useSidebarResize } from "../../hooks/useSidebarResize";
import rightSidebar from "./now-playing-sidebar.module.css";

export const NowPlayingSidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("right");

    return (
        <div className={rightSidebar.resizableSidebarContainer}>
            <div className={rightSidebar.resizebar} onMouseDown={handleMouseDown}></div>
            <div className={rightSidebar.resizableSidebar} style={{ width: sidebarWidth }}>

                {/* --- SIDEBAR CONTENT HERE --- */}

                <div className="logo">
                    <img src="https://static.thenounproject.com/png/1190180-200.png" alt="Logo" />
                </div>

                {/* --- SIDEBAR CONTENT HERE --- */}

                </div>
        </div>
    );
};
