import Head from "next/head";
import Navigation from "../../components/navigation";
import MeetingDetails from "../../components/zoom/MeetingDetails";
import MeetingViewer from "../../components/zoom/MeetingViewer";
import styles from '../../styles/Join.module.css';

export default function JoinZoomMeeting(){
    return (
        <div>
            <Head>
            <title>Rupasutra Zoom Integration Demo</title>
            <meta name="description" content="Sample demo application for zoom integration" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation/>
            <main className={styles.container}>
                <MeetingViewer/>
                <MeetingDetails />
            </main>
        </div>
    );
}