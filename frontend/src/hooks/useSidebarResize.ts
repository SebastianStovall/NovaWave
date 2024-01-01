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

            if(direction === 'right') {
                setSidebarWidth(Math.min(sidebarWidth + offsetX, 450))
                return
            }

            const windowWidth = handleWindowWidth()
            switch(windowWidth) {
                case 'LARGE':
                    setSidebarWidth(Math.min(newWidth, window.innerWidth * 0.52));
                    return
                case 'MEDIUM':
                    setSidebarWidth(Math.min(newWidth, window.innerWidth * 0.33));
                    return
                case 'SMALL':
                    setSidebarWidth(Math.min(newWidth, window.innerWidth * 0.33));
                    return
                case 'MOBILE':
                    setSidebarWidth(80);
                    return
                default:
                    return
            }
        }
    }

    const handleWindowWidth = () => {
        const windowWidth = window.innerWidth
        if(windowWidth >= 1431) {
            // large
            return 'LARGE'
        } else if(windowWidth < 1431 && windowWidth >= 939) {
            // medium
            return 'MEDIUM'
        } else if(windowWidth <= 938 && windowWidth > 641) {
            // small
            return 'SMALL'
        } else {
            //mobile
            return 'MOBILE'
        }
    }

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
    }, [isResizing, sidebarWidth]);

    return { isResizing, sidebarWidth, handleMouseDown };
};
