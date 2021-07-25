import { useEffect, useState } from "react"
import { isAuthenticated } from "../helpers/zoom_auth"
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    const path = Router.pathname;
    const isLogin = path.match('login');
    const isJoin = path.match('join');
    const {index} = Router.query;

    isAuthenticated()
    .then(res=>{
      if(res){setLoggedIn(true)}
      else{
        setLoggedIn(false);
        if(!isLogin && isJoin && index){
          Router.push('/login?meeting='+index);
        }
      }
    })
    .catch(console.error);
  });
  return <Component {...pageProps} isAuthenticated={loggedIn}/>
}

export default MyApp
