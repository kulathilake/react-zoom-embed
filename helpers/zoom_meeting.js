import { ZoomMtg } from "@zoomus/websdk";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av'); 
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk(); 
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));



export function getSignature(topic, password) {
    return fetch('/api/zoom/sign',{
        method: 'POST',
        body: JSON.stringify({
            topic,
        })
    })
    .then(res=>res.json())
    .then(res=>{
        return res.signature;
    })
    .catch(err=>{
        console.error(err);
    })
}

export function joinMeeting(signature,id,username,email,password){
    ZoomMtg.init({
        leaveUrl:'/join',
        disableCORP:  !window.crossOriginIsolated, // default    true,
        disableInvite: true,
        meetingInfo: [],
        disablePreview:true,
        success: function(){
            ZoomMtg.join({
                signature: signature,
                meetingNumber: id,
                userEmail: email,
                userName: username,
                passWord: password,
                apiKey: API_KEY,
                success: function() {
                    console.debug("Joined Meeting");
                    ZoomMtg.getAttendeeslist({});
                    ZoomMtg.getCurrentUser({
                      success: function (res) {
                        console.log("success getCurrentUser", res.result.currentUser);
                      },
                    });
                },
                error: function(error){
                    console.error(error);
                }
            })
        },
        error: function(error){
            console.log(error);
        }
    })
}