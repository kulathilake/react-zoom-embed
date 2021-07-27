import { useState } from "react";
import { addMeetingAttendee, protectMeeting } from "../helpers/admin_helpers";

export default function CreateMeeting(){
    const [protectedUrl, setProtectedUrl] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data  = new FormData(e.target);
        const zoomId = data.get('zoom_id');
        const zoomPass = data.get('zoom_pass');
        const joinLink = data.get('zoom_link');
        protectMeeting({
            zoom_id: zoomId,
            zoom_pass: zoomPass,
            join_url: joinLink
        })
        .then(res=>{
            if(res && res.meetingLink){
                setProtectedUrl(window.location.origin+ res.meetingLink);
                const uid = localStorage.getItem('user_id');
                const email = localStorage.getItem('email')
                addMeetingAttendee({
                    meetingId:res.meetingId,
                    userId:  uid,
                    email: email,
                    isHost: true
                })
                .then(res=>{
                    console.log(res);
                })
                .catch(console.error);
            }
        })
        .catch(console.error);
    }
    return (
        <div>
            <h1>Protect Meeting.</h1>
            <form onSubmit={handleSubmit}>
                <input name="zoom_id" placeholder="Zoom Meeting Id" required/>
                <input name="zoom_pass" placeholder="Zoom Meeting Password" type="password" required/>
                <input name="zoom_link" placeholder="Zoom Meeting Join Link" required/>
                <button>Create</button>
            </form>

            {(!!protectedUrl)&&
            <p>Publish Url: <a href={protectedUrl} target="_blank" rel="noreferrer">{protectedUrl}</a></p>
            }
        </div>
    )
}