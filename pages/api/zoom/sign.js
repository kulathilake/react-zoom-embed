const KJUR = require('jsrsasign')
// https://www.npmjs.com/package/jsrsasign

function generateVideoToken(sdkKey, sdkSecret, topic, password = "") {
  let signature = "";
  // try {
  const iat = Math.round(new Date().getTime() / 1000);
  const exp = iat + 60 * 60 * 2;

  // Header
  const oHeader = { alg: "HS256", typ: "JWT" };
  // Payload
  const oPayload = {
    app_key: sdkKey,
    iat,
    exp,
    tpc: topic,
    pwd: password,
  };
  // Sign JWT
  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  return signature;
}

const KEY = process.env.SDK_KEY;
const SECRET = process.env.SDK_SECRET; 

export default function handler(req, res) {
    try{
        generateVideoToken(KEY,SECRET,req.body.topic, req.body.password);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
  }
  

