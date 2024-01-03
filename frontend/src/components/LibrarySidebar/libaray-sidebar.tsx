import React from "react";
import librarySidebar from "./library-sidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");
    const isNarrow = sidebarWidth === 80;

    return (
        <>
            <div className={librarySidebar.resizableSidebarContainer}>
                <div className={librarySidebar.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

                    {/* //* --- SIDEBAR CONTENT BEGIN --- */}

                    <div className={librarySidebar.topNav}>
                        <ul>
                            <li>
                                <a href="/">
                                    <span className="fa fa-home"></span>
                                    <span id={librarySidebar.narrowMedia} className={isNarrow ? `${librarySidebar.narrowSpan}` : ``}>Home</span>
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    <span className="fa fa-search"></span>
                                    <span id={librarySidebar.narrowMedia} className={isNarrow ? `${librarySidebar.narrowSpan}` : ``}>Search</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={librarySidebar.mainLibrary}>
                        <div>
                            <a href="/">
                                <span className="fa fa-book"></span>
                                <span id={librarySidebar.narrowMedia} className={isNarrow ? `${librarySidebar.narrowSpan}` : `${librarySidebar.narrowMedia}`}>Your Library</span>
                            </a>
                            {!isNarrow && <div id={librarySidebar.narrowMedia} className='fa fa-plus'></div>}
                        </div>
                    </div>

                    {/* //* --- SIDEBAR CONTENT END --- */}

                </div>
            </div>
        <div className={librarySidebar.resizebar} onMouseDown={handleMouseDown}></div> {/* attach handleMouseDown to resizebar div */}
        </>
    );
};
