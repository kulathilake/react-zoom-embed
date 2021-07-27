import Head from "next/head";
import axios from 'axios';
import Router from 'next/router';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URL = process.env.NEXT_PUBLIC_AUTH_REDIRECT || 'http://localhost:3000/login';
import {requestUserAuthorization, setLocalTokens} from '../helpers/zoom_auth'
import { useEffect, useState } from "react";

export default function LoginPage(props){
    const {error, accessToken, refreshToken, expiresIn, isAuthenticated} = props;
    const [state,setState] = useState(null);
    useEffect(()=>{
        if(!isAuthenticated){          
            if(accessToken&&refreshToken&&expiresIn){
                setLocalTokens(accessToken,refreshToken,expiresIn)
            }else if(error){
                alert("Authentication Error: Fatal")
            }
        } else {
            const state = Router.query.state;
            if(state && state==='admin'){
                Router.push(`/admin`)
            }else if(state){
                Router.push(`/join/${state}`)
            }
        }
    },[error,accessToken,refreshToken,expiresIn,isAuthenticated,state]);

    useEffect(()=>{
        const meeting_ = Router.query.meeting;
        const admin = Router.query.admin;
        if(meeting_){
            setState(meeting_);
        }else if(admin){
            setState('admin');
        }
    },[]);

    return (
        <div>
            <Head>
                <title>Rupasutra Zoom Integration Demo</title>
                <meta name="description" content="Sample demo application for zoom integration" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Connect Your Zoom Account</h1>
                <p>This application uses your Zoom Account Details to authorize you to the meetings. 
                   Please click the button below to Connect.
                </p>
                <button onClick={()=>requestUserAuthorization(state)}>Connect</button>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx){
    const {code,meeting} = (ctx.query);
    
    if(code){
        const params = new URLSearchParams();
        const token = Buffer.from(CLIENT_ID+":"+process.env.CLIENT_SECRET).toString('base64');
        params.set('grant_type','authorization_code');
        params.set('code',code);
        params.set('redirect_uri',REDIRECT_URL);
        params.set('code_verifier', 1111132);
        if(meeting){
            params.set('state',meeting);
        }
        
        try{
            const authRes = (await axios.post('https://zoom.us/oauth/token',params.toString(),{
                headers:{
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })).data;
            return {
                props: {
                    accessToken: authRes.access_token,
                    refreshToken: authRes.refresh_token,
                    tokenType: authRes.token_type,
                    expiresIn: authRes.expires_in,
                }
            }

        } catch(error) {
            return {
                props: {
                    error: error.message
                }
            }
        }
    }else{
        return {
            props: {}
        }
    }
}