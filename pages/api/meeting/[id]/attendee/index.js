/** Get Meeting Attendees */
import db from '../../../../../helpers/db';
export default async function handler(req,res){
    const {id,limit,offset} = req.query;
    db.getAttendees({
        meetingId: id,
        limit: limit || 8,
        offset: offset || 0,
    },function(err,data){
        if(err){
            console.log(err);
            res.status(500).send(err.message)
        }else{
            if(data && data.length){
                db.getAttendeesCount({meetingId:id},function(error,total){
                    if(error){
                        res.status(500).send(err.message);
                    }else{
                        if(total && total.length)
                        res.status(200).json({data,total:total[0]['total']});
                    }
                })
            }else{
                res.status(404).send("Meeting Not Found");
            }
        }
    })
}