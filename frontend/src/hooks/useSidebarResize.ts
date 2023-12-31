import { useState, useEffect } from "react";

export const useSidebarResize = (direction: string) => { // this hook handles the logic for sidebar resizing, used in sidebar components
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(direction === 'left' ? 200 : 300);
    const [initialX, setInitialX] = useState(0); // initial X coordinate

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => { // when user presses down on mouse, setIsResizing(true)
        e.preventDefault();
        setIsResizing(true);
        setInitialX(e.clientX); // Store the initial X-coordinate
    };

    const handleMouseUp = () => { // when user lets go out mouse click setIsResizing(false)
        setIsResizing(false);
    };

    const handleMouseMove = (e: MouseEvent) => { // sets the new width of sidebar based on x-coordinate of mouse (CSS properties limit the range of the sidebar)
        if (isResizing) {
            const offsetX = initialX - e.clientX;
            const newWidth = direction === 'left' ? e.clientX : Math.min(sidebarWidth + offsetX, 450);
            setSidebarWidth(newWidth);
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove); // add event listeners when resizing so we can monitor x-coordinate and listen out for when user lets go of mouse
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove); // remove event listeners when not being used
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // cleanup when unmounting
            window.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line
    }, [isResizing]);

    return { isResizing, sidebarWidth, handleMouseDown };
};
