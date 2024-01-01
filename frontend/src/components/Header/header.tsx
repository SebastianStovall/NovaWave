import React from "react";
import headerStyles from './header.module.css'

export const Header: React.FC = () => {

    return (
        <div className={headerStyles.header}>
            <p>HEADER HERE</p>
        </div>
    );
};
