/** Authorizes a Meeting attendee by checking against a database of allowed attendees
 * If an atendee is not in a meeting list, return unauthorized, compelling expel action.
 */

import db from "../../../../../../helpers/db";

export default function handler(req,res){
    const {id,uid} = req.query;
    const {email} = req.body;
    console.log(uid,id,email);
    db.findMeetingAttendee({
        meetingId: id,
        uid: uid,
        email: email
    },function(err,data){
        if(err){
            res.status(500).send(err.message)
        }else{
            if(data && data.length){
                res.status(200).send("AUTHORIZED");
            }else{
                res.status(200).send("UNAUTHORIZED");
            }
        }
    })
}