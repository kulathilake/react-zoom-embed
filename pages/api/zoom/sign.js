const db = require('../../../helpers/db').default;
const crypto = require('crypto') // crypto comes with Node.js
const axios = require('axios');

function generateSignature(apiKey, apiSecret, meetingNumber, role) {

  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}

const KEY = process.env.NEXT_PUBLIC_API_KEY;
const SECRET = process.env.API_SECRET; 

export default async function handler(req, res) {

    try{
        const {id} = req.body;
        const {authorization} = req.headers;
        const authRes = (await axios.get('https://api.zoom.us/v2/users/me',{
                headers:{
                    'Authorization':  `${authorization}`
                }
        })).data;
        console.log(authRes.id)
        const {topic,role,password} = await getAttendeeDetails(id,authRes.id,authRes.email);
        console.log(topic);
        const signature = generateSignature(KEY,SECRET,topic, role);
        res.json({
          signature,
          meetingId: topic,
          password: password,
          isOwner: role===1,
        });
    } catch (error) {
        if(error.message === 'UNAUTHORIZED'){
          res.status(401).send({error: 'UNAUTHORIZED'});
        } else {
          res.status(500).send({error:error.message});
        }
    }
  }

async function getAttendeeDetails(meeting,uid,email){
    return new Promise((res,rej)=>{
      db.findMeetingAttendee({meetingId: meeting,uid,email},(err,data)=>{
        if(err){
          rej(err);
        }else{
          if(data && data.length){
            res({
              role: data[0].isHost?1:0,
              topic: data[0].zoom_id,
              password: data[0].password
            });
          }else{
            rej(new Error("UNAUTHORIZED"))
          }
        }
      })
  })
}
  

