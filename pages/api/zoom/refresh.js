import axios from "axios";

export default async function handler(req, res) {
    try{
        const {refreshToken} = JSON.parse(req.body);
        const body = new URLSearchParams();
        const authorization = Buffer.from(process.env.NEXT_PUBLIC_API_KEY+":"+process.env.API_SECRET).toString('base64')
        body.set('grant_type','refresh_token');
        body.set('refresh_token',refreshToken);
        const refreshRes = (await axios.post('https://zoom.us/oauth/token',body.toString(),{
            headers: {
                'Authorization': `Basic ${authorization}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })).data;
        if(data){
            res.json(data);
        } else {
            throw new Error("Failed to refresh tokens");
        }
    } catch (error) {
        res.status(500).send({error:error.message});
    }
  }
  