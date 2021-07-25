import Link from 'next/link';

export default function Navigation(){
    return (
        <nav >
            <ul >
                <li><Link href="/">Demo Home</Link></li>
                <li><a href="https://www.rupasutra.com">Rupasutra</a></li>
            </ul>

        </nav>
    )
}