import React from "react";
import librarySidebar from "./library-sidebar.module.css";
import { useSidebarResize } from "../../hooks/useSidebarResize";

export const LibrarySidebar: React.FC = () => {
    const { sidebarWidth, handleMouseDown } = useSidebarResize("left");

    return (
    <div className={librarySidebar.resizableSidebarContainer}>
        <div className={librarySidebar.resizableSidebar} style={{ width: sidebarWidth }}> {/* inital width of container contained in state, but changed with events */}

            {/* --- SIDEBAR CONTENT HERE --- */}
            <div className="logo">
                <img src="https://static.thenounproject.com/png/1190180-200.png" alt="Logo" />
            </div>
        {/* --- SIDEBAR CONTENT HERE --- */}

        </div>
        <div className={librarySidebar.resizebar} onMouseDown={handleMouseDown}></div> {/* attach handleMouseDown to resizebar div */}
    </div>
    );
};

// {/* <div className="navigation">
//                 <ul>
//                     <li>
//                         <a href="/">
//                             <span className="fa fa-home"></span>
//                             <span>Home</span>
//                         </a>
//                     </li>

//                     <li>
//                         <a href="/">
//                             <span className="fa fa-search"></span>
//                             <span>Search</span>
//                         </a>
//                     </li>

//                     <li>
//                         <a href="/">
//                             <span className="fa fas fa-book"></span>
//                             <span>Library</span>
//                         </a>
//                     </li>
//                 </ul>
//             </div> */}
