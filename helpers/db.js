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
            if(err) console.log(error.message);
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

    isUserAdmin(uid,callback){
        this.connection.query(`SELECT COUNT() from admins WHERE admins.uid - '${uid}' `,function(err,results){
            if(err){
                callback(err,null);
            }else{
                if(data && data.length){
                    callback(true);
                } else {
                    callback(false);
                }
            }
        })
    }

    protectMeeting({meeting_id,zoomId, zoomPass, zoomLink,uid},callback){
        this.connection.query("INSERT INTO `meetings` (`meeting_id`,`zoom_id`,`password`,`join_url`,`createdBy`) VALUES " + ` ('${meeting_id}','${zoomId}','${zoomPass}','${zoomLink}','${uid}')`,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
        })
    }

    isHost({meetingId,uid},callback){
        this.connection.query(`SELECT COUNT(*) FROM attendees WHERE meeting_id='${meetingId}' AND user_id='${uid}' AND isHost=${true}`,
        function(err,data){
            if(err){
                callback(err,null);
            }else{
                if(data && data.length){
                    callback(null,true);
                }else{
                    callback(null,false);
                }
            }
        })
    }

    addAttendee({meetingId, uid, isHost,email},callback){
        this.connection.query("INSERT INTO `attendees` (`meeting_id`,`user_id`,`isHost`,`isAllowed`,`isLive`,`email`) VALUES" + `('${meetingId}','${uid}',${isHost}, ${true}, ${false},'${email}')`,
        function(err,data){
            if(err){
                callback(err,null);
            } else{
                callback(null,data);
            }
        })
    }

    getAttendees({meetingId,uid,limit,offset,},callback){
        this.connection.query("SELECT * FROM `attendees` WHERE " + `meeting_id='${meetingId}' LIMIT ${limit} OFFSET ${offset}`,
        function(err,data){
            if(err){
                callback(err,null);
            } else {
                callback(null,data);
            }
        })
    }

    getAttendeesCount({meetingId},callback){
        this.connection.query("SELECT COUNT(*) as total FROM `attendees` WHERE " + `meeting_id='${meetingId}'`,
        function(err,data){
            if(err){
                callback(err,null);
            } else {
                callback(null,data);
            }
        })
    }

    deleteAttendee(id,callback){
        this.connection.query("DELETE FROM `attendees` WHERE id="+`'${id}'`,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
        })
    }

    updateIsAllowed({id,isAllowed},callback){
        this.connection.query("UPDATE `attendees` SET `isAllowed`="+`${isAllowed}` + " WHERE `id`="+ `'${id}'` ,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
        })
    }

    updateIsHost({id,isHost},callback){
        this.connection.query("UPDATE `attendees` SET `isHost`="+`${isHost}` + " WHERE `id`="+ `'${id}'` ,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
        })
    }
}

export default new DB();

