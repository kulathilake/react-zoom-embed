import db from "../../../../../../helpers/db";

export default async function handler(req,res){
    try {
        const {id,uid} = req.query;
        db.deleteAttendee(uid,function(err,data){
            if(err){
                res.status(400).send("Action Failed");
            }else{
                res.status(200).send("User Removed");
            }
        })
    } catch (error) {
        
    }
}