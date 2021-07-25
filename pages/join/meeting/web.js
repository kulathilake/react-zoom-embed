import { useEffect } from "react"

export default function MeetingWebView(){
    useEffect(()=>{
        const meetingId = localStorage.getItem('meetingId');
        const password = localStorage.getItem('meetingPassword');
        const signature = localStorage.getItem('signature');
        const username = localStorage.getItem('user_id');
        const email = localStorage.getItem('email');    
        import('../../../helpers/zoom_meeting')
        .then(func=>{
            func.joinMeeting(signature,meetingId,username,email,password)
        });
    },[])
    return (
        <div>
            Please Wait...
        </div>
    )
}