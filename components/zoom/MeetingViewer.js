import styles from '../../styles/Meeting.module.css'
export default function MeetingViewer({forwardRef}) {
    return (
        <div className={styles.meetingViewer} ref={forwardRef}></div>
    )
}