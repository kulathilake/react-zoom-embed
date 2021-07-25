import axios from "axios";

export default async function handler(req, res) {
    try{
        const {authorization} = req.headers;
        if(authorization) {
            const authRes = (await axios.get('https://api.zoom.us/v2/users/me',{
                headers:{
                    'Authorization':  `${authorization}`
                }
            })).data;

            res.send(authRes);

        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (error) {
        res.send({error:error.message});
    }
  }