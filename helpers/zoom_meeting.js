import { ZoomMtg } from "@zoomus/websdk";
import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
ZoomMtg.setZoomJSLib('/node_modules/@zoomus/websdk/dist/lib', '/av'); 
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk(); 
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));



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
                    ZoomMtg.getAttendeeslist({
                        success: console.log
                    });
                    ZoomMtg.getCurrentUser({
                      success: function (res) {
                        console.log("success getCurrentUser", res.result.currentUser);
                      },
                    });
                },
                error: function(error){
                    console.error(error);
                },
            })
        },
        error: function(error){
            console.log(error);
        },
        
    })
    
    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
        console.log('inMeetingServiceListener onUserJoin', data);
    });

}



