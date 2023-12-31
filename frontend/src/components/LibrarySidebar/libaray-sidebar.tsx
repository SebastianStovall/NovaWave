import React, { useState, useEffect } from "react";
import librarySidebar from './libaray-sidebar.module.css'

export const LibrarySidebar: React.FC = () => {
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(200); // TODO --> refactor to use LocalStorage

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => { // when user presses down on the resize bar div, setIsResizing(true)
        e.preventDefault();
        setIsResizing(true);
    };

    const handleMouseUp = () => { // when the user releases mouse, setIsResizing(false)
        setIsResizing(false);
    };

    const handleMouseMove = (e: MouseEvent) => { // calculates the new width of the sidebar based on the mouse's X-coordinate
        if (isResizing) {
            const newWidth = Math.min(50 * window.innerWidth / 100, Math.max(100, e.clientX)); // Math.min + Math.max ensure it stays in a range
            setSidebarWidth(newWidth);
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove); // when resizing, any mouse movement will trigger handleMouseMove()
            window.addEventListener('mouseup', handleMouseUp); // when resizing, unclicking mouse will trigger handleMouseUp()
        } else {
            window.removeEventListener('mousemove', handleMouseMove); // when resizing is done, event listeners no longer needed
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // cleanup
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div className={librarySidebar.resizablesidebarcontainer}>
            <div className={librarySidebar.resizablesidebar} style={{ width: sidebarWidth }}>  {/* width of container contained in state, changed with events */}
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
