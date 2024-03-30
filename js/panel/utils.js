import { getToken } from "./../funcs/utils.js";
const getAdminInfos=async()=>{
   
  const token = getToken();
  if (!token) {
    return false;
  } 
    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
      headers:{

        Authorization: `Bearer ${token}`,
      }
    })
    const admin = await res.json()
    return admin
    
}





export {getAdminInfos}