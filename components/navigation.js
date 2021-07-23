import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export default function Navigation(){
    return (
        <nav className={styles.navigation}>
            <ul className={styles.navItemsList}>
                <li><Link href="/">Demo Home</Link></li>
                <li><a href="https://www.rupasutra.com">Rupasutra</a></li>
            </ul>

        </nav>
    )
}