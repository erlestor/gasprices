import React from 'react';
import styles from './header.module.css';
import { BsSearch } from "react-icons/bs";

export default function Header() {
    return (
        <div className={styles.header}>
            <div>
                <h3>Headername</h3>
            </div>
        </div>
    );
}