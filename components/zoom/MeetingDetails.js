import styles from '../../styles/Meeting.module.css';
export default function MeetingDetails(){
    return (
        <div className={styles.meetingDetails}>
            <form>
                <input name="meeting_id" placeholder="Meeting ID" required/>
                <input name="meeting_pass" placeholder="Meeting Password" required/>
                <input name="meeting_email" placeholder="Your Email" required/>
                <button>Join Meeting</button>
            </form>
        </div>
    )
}