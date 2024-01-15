import React, {useEffect} from "react";
import styles from './header.module.css'
import { useAppSelector } from "../../hooks";

export const Header: React.FC = () => {

    const user = useAppSelector((state) => state.session.user)

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
            <div>
                <div>
                    <button >
                        <svg aria-hidden="true" width="15px" height='18px' viewBox="0 0 16 16"> <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path></svg>
                    </button>
                    <button >
                        <svg aria-hidden="true" width="15px" height='18px' viewBox="0 0 16 16"> <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path></svg>
                    </button>
                </div>
                {user ?
                    <button>
                        <img src='https://i.pinimg.com/736x/35/99/27/359927d1398df943a13c227ae0468357.jpg' alt="pf-pic" />
                    </button>
                :
                    <ul>
                        <li>
                            <a href="/">Sign up</a>
                        </li>
                        <button type="button">Log In</button>
                    </ul>
                }
            </div>
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
