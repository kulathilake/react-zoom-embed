import axios from 'axios';
export default async function handler(req,res){
    try {
        const {userid} = req.query;
        const {authorization} = req.headers; 
        const userRes = (await axios.get('https://api.zoom.us/v2/users/'+userid,{
            headers:{
                'Authorization': `${authorization}`
            }
        })).data;
        res.json(userRes);
    } catch (error) {
        res.status(500).send();
    }
}