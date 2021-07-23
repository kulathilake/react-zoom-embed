import styles from '../../styles/Meeting.module.css';
export default function MeetingDetails({handleJoin}){
    const onFormSubmit = (e)=>{
        e.preventDefault();
        const data =new FormData(e.target);
        handleJoin(
            data.get('meeting_id'),
            data.get('meeting_name'),
            data.get('meeting_email'),
            data.get('meeting_pass')
        )
    }
    return (
        <div className={styles.meetingDetails}>
            <form onSubmit={onFormSubmit}>
                <input name="meeting_id" placeholder="Meeting ID" required/>
                <input name="meeting_pass" placeholder="Meeting Password" required/>
                <input name="meeting_name" placeholder="Your Name" required/>
                <input name="meeting_email" placeholder="Your Email" required/>
                <button>Join Meeting</button>
            </form>
        </div>
    )
}