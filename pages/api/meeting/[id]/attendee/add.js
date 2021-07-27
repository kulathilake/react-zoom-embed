/** Update or remove an attendee from a meeting */

import db from "../../../../../helpers/db";
import axios from "axios";

export default async function handler(req,res){
    try {
        const {authorization} = req.headers;
        const {meetingId, uid, email, isHost} = req.body;
        const {id} = (await axios.get('https://api.zoom.us/v2/users/me',{
            headers:{
                'Authorization':  `${authorization}`
            }
        })).data;
        
        // Check if the current user is host of given meeting.
        db.isHost({meetingId,uid:id},function(err,isHost){
            if(err){
                console.log(err);
                res.status(401).send("Authorization Failed");
            }else if(isHost){
                addAttendeeToMeeting({meetingId,uid,email},res);
            }else{
                res.status(401).send("Unauthorized Action")
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

function addAttendeeToMeeting({meetingId,email,uid="EMAIL",isHost=false},res){
    db.addAttendee({
        meetingId,
        uid,
        isHost,
        email
    },function(err,data){
        if(err){
            console.log(err);
            res.status(400).send("Failed to Add Attendee");
        }else{
            res.status(201).send("Attendee Added");
        }
    })
}