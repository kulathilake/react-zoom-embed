import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URL = process.env.NEXT_PUBLIC_AUTH_REDIRECT || 'http://localhost:3000/login';
export function requestUserAuthorization(state){
    window.location.replace(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}`
    )
}

export async function refreshAccessToken(){
    const refreshToken = localStorage.getItem('refreshToken');
    const body = {
        refreshToken
    };
    if(refreshToken){
        const refreshRes = (await (axios.post('/api/zoom/refresh',body))).data;
        if(refreshRes && refreshRes.tokens){
            setLocalTokens(refreshRes.tokens.accessToken, refreshRes.tokens.refreshToken,refreshRes.tokens.expiresIn);
            return;
        } else if (refreshRes && refreshRes.error){
            throw new Error('Refresh Token action failed.');
        }
    }else{
        throw new Error('A valid refresh token could not be found');
    }
}

export async function isAuthenticated(){
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        try{
            const meRes = (await axios.get('/api/zoom/me',{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })).data;
            if(meRes){
                console.log(meRes);
                if(meRes.error){
                    console.debug('Attempting Refresh');
                    const refreshRes = await refreshAccessToken();
                    console.log(refreshRes);
                    if(refreshRes) return true;
                }else{
                    setLocalUserData(meRes);
                    return true;
                }
            } else {
                
            }
        } catch (error) {
            console.debug(error);
            return false;
        }
    } else {
        return false;
    }
}

export function setLocalUserData(data){
    localStorage.setItem('user_id',data.id);
    localStorage.setItem('email',data.email);
}

export function setLocalTokens(accessToken,refreshToken,expiresIn) {
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('refreshToken',refreshToken);
    localStorage.setItem('expiresIn',expiresIn);
}

export function logOut(){
    localStorage.clear();
}

export async function getSignature(id) {
    const accessToken = localStorage.getItem('accessToken');
    const body = {
        id
    }
    if(accessToken){
        try{
            const signRes = (await axios.post('/api/zoom/sign',body,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })).data;
            console.log(signRes)
            if(signRes && signRes.error){
                throw new Error("Unauthorized");
            }else{
                return signRes
            }
        } catch (e) {
            throw new Error("Sigining Failed")
        }
    }else{
        throw new Error('Unauthorized');
    }
}