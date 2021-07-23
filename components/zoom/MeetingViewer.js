import styles from '../../styles/Meeting.module.css'
export default function MeetingViewer({ref}) {
    return (
        <div className={styles.meetingViewer} ref={ref}>
            Meeting Viewer
        </div>
    )
}