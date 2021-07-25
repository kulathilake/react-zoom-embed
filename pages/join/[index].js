import Head from "next/head";
import { createRef } from "react";
import Navigation from "../../components/navigation";
import "@zoomus/websdk/dist/css/bootstrap.css";
import "@zoomus/websdk/dist/css/react-select.css";

export default function JoinZoomMeeting(){
    const viewerRef = createRef();
    const handleJoinMeeting = async (id,username,email,password) => {
        const getSignature = (await import("../../helpers/zoom_meeting")).getSignature;
        const joinMeeting = (await import("../../helpers/zoom_meeting")).joinMeeting;
        try{
            const signature = await getSignature(id,password);
            if(signature){
                joinMeeting(signature,id,username,email,password);
                const root = document.getElementById('zmmtg-root');
                viewerRef.current.append(root);
                
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <Head>
            <title>Rupasutra Zoom Integration Demo</title>
            <meta name="description" content="Sample demo application for zoom integration" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
              
            </main>
        </div>
    );
}