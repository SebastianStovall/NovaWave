import React, {useEffect} from "react";
import styles from './header.module.css'
import { useAppSelector } from "../../hooks";
import { useLocation } from 'react-router-dom';
import mediaViewStyles from '../../pages/MediaView/mediaView.module.css'

export const Header: React.FC = () => {

    const user = useAppSelector((state) => state.session.user)
    const headerState = useAppSelector((state) => state.header)
    const location = useLocation();

    useEffect(() => { /* header component is absolutely positioned with relative container so full width works, however, JS scroll logic is needed to acheieve sticking behavior due to relatively positioned parent */
        const handleScroll = () => {
            const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
            const header = document.querySelector('.header_header__lOwdN') as HTMLElement;

            if (mainContent && header) {
                const scrollPosition = mainContent.scrollTop;
                header.style.top = `${scrollPosition}px`; // set header positioned based on scroll position in mainContent div

                let bgOpacity;
                if(location.pathname === '/') {
                    // DASHBOARD
                    bgOpacity = Math.min(scrollPosition / 120, 1);
                } else {
                    // MEDIA VIEW PAGE
                    const steps = Math.min(Math.floor((scrollPosition - 179) / 5), 12);
                    bgOpacity = Math.min(steps * 0.05, 0.6);
                    if(scrollPosition > 380) {
                        console.log("YES")
                    } else {
                        console.log("NO")
                    }
                }

                if(location.pathname === '/') {
                    // DASHBOARD
                    header.style.backgroundColor = `rgba(${headerState.color}, ${bgOpacity})`;
                } else {
                    // MEDIA VIEW
                    header.style.background = `linear-gradient(rgba(0,0,0,${bgOpacity}) 0,rgba(18,18,18,${(bgOpacity === 0.6 ? 1 : bgOpacity)}) 100vw),rgba(${headerState.color}, ${(bgOpacity === 0.6 ? 1 : bgOpacity)})`;
                }

            }
        };

        const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
        mainContent.addEventListener('scroll', handleScroll); // attach scroll event listener onto mainContent div

        return () => {
            mainContent.removeEventListener('scroll', handleScroll);
        };
    }, [headerState, location.pathname]);

    return (
        <div className={styles.header}>
            <div>
                <div>
                    <div>
                        <button >
                            <svg aria-hidden="true" width="15px" height='18px' viewBox="0 0 16 16"> <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path></svg>
                        </button>
                        <button >
                            <svg aria-hidden="true" width="15px" height='18px' viewBox="0 0 16 16"> <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path></svg>
                        </button>
                    </div>

                    {headerState && headerState.media && (
                    <div className={styles.headerMediaContainer}>
                        <div className={mediaViewStyles.resumeAndPause} style={{width: '48px', height: '48px'}}>
                            <div className={`fas fa-play`}></div>
                        </div>
                    </div>
                    )}
                    { headerState && headerState.media && <p className={styles.headerMediaText}>{headerState.media}</p>}
                </div>


                {user ?
                    <div>
                        <button>
                            <img src='https://i.pinimg.com/736x/35/99/27/359927d1398df943a13c227ae0468357.jpg' alt="pf-pic" />
                        </button>
                    </div>
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




// // Original logic for fade in for mediaView header
// if (scrollPosition < 179) {
//     bgOpacity = 0;
// } else if (scrollPosition >= 179 && scrollPosition <= 184) {
//     // have ranges defined here at step by 0.05...
// } else {
//     bgOpacity = Math.min(scrollPosition / 480, 0.60)
// }
