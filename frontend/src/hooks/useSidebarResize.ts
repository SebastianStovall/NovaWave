import { useState, useEffect } from "react";

export const useSidebarResize = (direction: string) => { // this hook handles the logic for sidebar resizing, used in sidebar components
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] =
    useState(
        direction === 'left' ?
        JSON.parse(localStorage.getItem('librarySidebarWidth') || '240')
        :
        JSON.parse(localStorage.getItem('nowPlayingSidebarWidth') || '300')
    );
    const [initialX, setInitialX] = useState(0); // initial X coordinate



    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => { // when user presses down on mouse, setIsResizing(true)
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
                localStorage.setItem('nowPlayingSidebarWidth', JSON.stringify(Math.min(sidebarWidth + offsetX, 450)))
                setSidebarWidth(Math.min(sidebarWidth + offsetX, 450))
                return
            }

            const windowWidth = handleWindowWidth() // this, along with the css constraints, limit max-width of sidebars depending on screen size
            switch(windowWidth) {
                case 'LARGE':
                    handleLeftScrolling(e, newWidth, 0.52)
                    return
                case 'MEDIUM':
                    handleLeftScrolling(e, newWidth, 0.27)
                    return
                case 'SMALL':
                    handleLeftScrolling(e, newWidth, 0.33)
                    return
                case 'MOBILE':
                    setSidebarWidth(80);
                    return
                default:
                    return
            }
        }
    }

    const handleWindowWidth = () => { // width of sidebar depends on screen size
        const windowWidth = window.innerWidth
        if(windowWidth >= 1431) {
            // large
            return 'LARGE'
        } else if(windowWidth < 1430 && windowWidth >= 1024) {
            // medium
            return 'MEDIUM'
        } else if(windowWidth <= 1023 && windowWidth > 641) {
            // small
            return 'SMALL'
        } else {
            //mobile
            return 'MOBILE'
        }
    }

    const handleLeftScrolling = (e: MouseEvent, newWidth: number, portionOfScreen: number) => { // refactored conditiona logic of resizing into its own function
        setSidebarWidth((prevWidth: any) => {
            if (e.clientX < 160) {
                localStorage.setItem('librarySidebarWidth', JSON.stringify(80))
                return 80;
            } else if (e.clientX > 160 && e.clientX <= 240) {
                localStorage.setItem('librarySidebarWidth', JSON.stringify(240))
                return 240;
            } else {
                localStorage.setItem('librarySidebarWidth', JSON.stringify(Math.min(newWidth, window.innerWidth * portionOfScreen)))
                return Math.min(newWidth, window.innerWidth * portionOfScreen);
            }
        });
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
    }, [isResizing]);

    return { sidebarWidth, handleMouseDown };
};
