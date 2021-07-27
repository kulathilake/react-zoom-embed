import { useState } from "react";
import { addMeetingAttendee } from "../helpers/admin_helpers";
import AttendeeList from "./AttendeeList";

export default function AddAttendee(props){
    const [id,setId] = useState(null);
    const [refresh,setRefresh] = useState(false);

    const handleSubmit= (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const meetingId = data.get('meeting_id');
        const email = data.get('attendee_email');
        addMeetingAttendee({
            meetingId: meetingId,
            email: email,
            userId: 'EMAIL',
            isHost: false
        })
        .then((res)=>{
            alert("Attendee Added");
            setId(meetingId);
            setRefresh(true);
            console.log(res);
        })
        .catch((error)=>{
            alert("Error Adding Attendee");
        });
    }
    return (
        <div>
            <h1>Add Attendees to Meeting</h1>
            <form onSubmit={handleSubmit}>
                <input name="meeting_id" required placeholder="Public Meeting ID"/>
                <input name="attendee_email" required placeholder="Attendee Email"/>
                <button>Add</button>
            </form>
            {(!!id)&&
                <AttendeeList id={id} refresh={refresh} setRefresh={setRefresh}/>
            }
        </div>
    )
}