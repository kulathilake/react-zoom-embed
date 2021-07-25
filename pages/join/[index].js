import Head from "next/head";
import "@zoomus/websdk/dist/css/bootstrap.css";
import "@zoomus/websdk/dist/css/react-select.css";
import { getSignature } from "../../helpers/zoom_auth";
import { useEffect, useState } from "react";
import Router from 'next/router';

export default function JoinZoomMeeting(props){
    const {error} = props;
    const [signature,setSignatre] = useState(null);
    const [isOwner,setIsOwner] = useState(false);
    useEffect(()=>{
        const {index} = Router.query;
        getSignature(index)
        .then(res=>{
            setSignatre(res.signature);
            setIsOwner(res.isOwner);
            localStorage.setItem('meetingId',res.meetingId);
            localStorage.setItem('meetingPassword',res.password);
            localStorage.setItem('signature',res.signature);
            console.log(res);
            if(!res.isOwner){
                Router.push('/join/meeting/web');
            }
        })
        .catch((error) => {
            console.debug(error);
            setSignatre(null);
        });
    },[]);

    return(<div>
            <Head>
            <title>Rupasutra Zoom Integration Demo</title>
            <meta name="description" content="Sample demo application for zoom integration" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {(signature && isOwner)&&
                <>
                    <div>
                        <iframe width={'800px'} height={'500px'}  src="/join/meeting/web"></iframe>
                    </div>
                    <div>
                        
                    </div>
                </>
                }
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx){
    try {

        return {
            props:{}
        }
        
    } catch (error) {
        return {
            props:{
                error: error.message
            }
        }
    }
}