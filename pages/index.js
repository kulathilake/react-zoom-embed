import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rupasutra Zoom Integration Demo</title>
        <meta name="description" content="Sample demo application for zoom integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        <a href="https://nextjs.org">Rupasutra</a> Zoom Integration Demo
        </h1>

        <p className={styles.description}>
          See how we can assist you to integrate Zoom meetings and webinars into your 
          application.
        </p>

        <div className={styles.grid}>
          <Link href="/join" passHref={true} >
            <a className={styles.card}>
            <h2>Join Meeting Inside Application &rarr;</h2>
            <p>Embedd any Zoom meeting with a known ID and password inside this application</p>
            </a>
          </Link>

          <Link href="/create" passHref={true} >
            <a className={styles.card}>
            <h2>Create Zoom Meeting From Application &rarr;</h2>
            <p>Create an instant or scheduled Zoom Meeting from within the application.</p>
            </a>
          </Link>

          <Link href="/join/protected" passHref={true}>
            <a className={styles.card}>
            <h2>Meeting behind paywalls &rarr;</h2>
            <p>Create a Zoom meeting behind your own paywall.</p>
            </a>
          </Link>

          <a
            href="https://www.fiverr.com/share/d5x8Rz"
            target='_blank'
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>I want something similar &rarr;</h2>
            <p>
              Get your Zoom integration built right away with the right tools and techniques
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.rupasutra.com" 
          target="_blank"
          rel="noopener noreferrer">Rupasutra</a>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
