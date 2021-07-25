/** Get Meeting Attendees */

export async function handler(req,res){
    const {id} = req.query;
    console.log(uid,id,email);
    db.findMeetingAttendee({
        meetingId: id,
        uid: "%",
        email: "%"
    },function(err,data){
        if(err){
            res.status(500).send(err.message)
        }else{
            console.log(data[0])
            if(data && data.length){
                res.status(200).json(data);
            }else{
                res.status(200).send("Meeting Not Found");
            }
        }
    })
}