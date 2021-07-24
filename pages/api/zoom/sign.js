const crypto = require('crypto') // crypto comes with Node.js

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

export default function handler(req, res) {
    try{
        const {topic} = JSON.parse(req.body);
        const signature = generateSignature(KEY,SECRET,topic, 0);
        res.json({signature});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
  }
  

