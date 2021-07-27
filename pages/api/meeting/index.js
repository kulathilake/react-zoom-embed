/** Add a Zoom Meeting to the protected list of meetings */

import db from "../../../helpers/db";
import short from 'short-uuid';
import axios from 'axios'

export default async function handler(req,res){
    try {
        const {zoomId, zoomPass, zoomLink} = req.body;
        const {authorization} = req.headers;
        const shortId = short.generate();
        const {id} = (await axios.get('https://api.zoom.us/v2/users/me',{
            headers:{
                'Authorization':  `${authorization}`
            }
        })).data;
        if(!!!id) res.send(401).send("Unauthorized");
        db.protectMeeting({
            meeting_id: shortId,
            zoomId,
            zoomPass,
            zoomLink,
            uid:id,
        },function(err,data){
            if(err){
                console.log(err);
                res.status(400).send("Invalid Request");
            }else{
                res.status(201).json({
                    meetingId: shortId,
                    meetingLink: `/join/${shortId}`
                })
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}