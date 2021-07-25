import axios from "axios";

export default async function handler(req, res) {
    try{
        const {refreshToken} = req.body;
        console.log(refreshToken);
        const body = new URLSearchParams();
        const authorization = Buffer.from(process.env.NEXT_PUBLIC_API_KEY+":"+process.env.CLIENT_SECRET).toString('base64')
        body.set('grant_type','refresh_token');
        body.set('refresh_token',refreshToken);
        const refreshRes = (await axios.post('https://zoom.us/oauth/token',body.toString(),{
            headers: {
                'Authorization': `Basic ${authorization}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })).data;
        if(refreshRes){
            res.json({
                tokens: {
                    accessToken: refreshRes.access_token,
                    refreshToken: refreshRes.refresh_token,
                    expiresIn: refreshRes.expires_in
                }
            });
        } else {
            throw new Error("Failed to refresh tokens");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:error.message});
    }
  }
  