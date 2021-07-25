import mysql from 'mysql';
class DB{
    constructor(){
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA
        });

        this.connection.connect(function(err){
            if(err) throw err;
            console.log('Database Connected')
        })
    }

    findMeeting(meetingId,callback){
        this.connection.query(`SELECT * FROM meetings WHERE meeting_id='${meetingId}'`,function(err,results){
            if(err){
                callback(err,null);
            }else{
                callback(null,results)
            }
        })
    }

    createMeeting({meetingId,zoomId,password,joinUrl,userId},callback){
        this.connection.query(`INSERT INTO meetings (meeting_id, zoom_id, password, join_url,createdBy) VALUES (
            ${meetingId},${zoomId},${password},${joinUrl},${userId}
        )`,function(err,results){
            if(err){
                callback(err,null);
            }else{
                callback(null,results);
            }
        })
    }


    findMeetingAttendee({meetingId,uid,email},callback){
        this.connection.query(`SELECT * FROM attendees 
        INNER JOIN meetings
        ON attendees.meeting_id = meetings.meeting_id WHERE attendees.meeting_id = '${meetingId}' 
        AND (attendees.user_id = '${uid}' OR attendees.email = '${email}')`,function(err,results){
            if(err){
                callback(err,null);
            }else{
                callback(null,results);
            }
        })
    }

}

export default new DB();

