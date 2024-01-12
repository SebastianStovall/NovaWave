import React, {useEffect} from "react";
import styles from './header.module.css'

export const Header: React.FC = () => {

    useEffect(() => { /* header component is absolutely positioned with relative container so width works, however, scroll logic is needed to acheieve sticking behavior due to relative positioning on parent */
        const handleScroll = () => {
            const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
            const header = document.querySelector('.header_header__lOwdN') as HTMLElement;

            if (mainContent && header) {
                const scrollPosition = mainContent.scrollTop;
                header.style.top = `${scrollPosition}px`; // set header positioned based on scroll position in mainContent div

                const BGopacity = Math.min(scrollPosition / 120, 1); // Adjust background opacity with fade in transition (if passed 120px, opacity will be full)
                header.style.backgroundColor = `rgba(33, 17, 95, ${BGopacity})`;
            }
        };

        const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
        mainContent.addEventListener('scroll', handleScroll); // attach scroll event listener onto mainContent div

        return () => {
            mainContent.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.header}>
            <p>HEADER HERE</p>
        </div>
    );
};





    // const allElements = document.querySelectorAll('*');
    // allElements.forEach(element => {
    //     console.log("Element:", element.tagName);

    //     const classes = Array.from(element.classList);
    //     if (classes.length > 0) {
    //       console.log("   Classes:", classes.join(', '));
    //     }

    //     const id = element.id;
    //     if (id) {
    //       console.log("   ID:", id);
    //     }

    //     console.log("------------");
    //   });
