import axios from "axios";

export async function protectMeeting({
    zoom_id,zoom_pass,join_url
}){
    try {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            zoomId: zoom_id,
            zoomPass: zoom_pass,
            zoomLink: join_url
        }
        return (await axios.post('/api/meeting',data,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })).data;
    } catch (error) {
        console.error(error);
    }
}

export async function addMeetingAttendee({
    meetingId,
    uid="EMAIL",
    email,
    isHost
}){
    try {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            meetingId, 
            uid, 
            email, 
            isHost
        }
        return (await axios.post(`/api/meeting/${meetingId}/attendee/add`,data,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })).data;
        
    } catch (error) {
        console.log(error);
    }
}

export async function listMeetingAttendees(meetingId,limit=8,offset=0){
    try{
        const accessToken = localStorage.getItem('accessToken');
        return (await axios.get(`/api/meeting/${meetingId}/attendee?limit=${limit}&offset=${offset}`,{
            headers:{
                'Authorization': 'Bearer ' + accessToken
            }
        })).data;
    }catch(error){
        console.log(error);
    }
}

export async function removeAttendee(id){

}

export async function toggleAccess(id,access){

}

export async function toggleIsHost(id,isHost){

}