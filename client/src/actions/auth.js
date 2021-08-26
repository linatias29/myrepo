import coockie from 'js-cookie'
import axios from 'axios';
import Config from '../config/config';
// const history=useHistory();
export const signout=(next)=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
   
}
export const signup= postData =>{
    return axios.post(Config.getServerPath()+'user',postData)
    .then(res => {

return res;



    })
    .catch((err) => { return err}   );
};

export const signin= postData =>{
  
    return axios.post(Config.getServerPath()+'userLogin/'+postData.email+'/'+postData.password)
      .then(res => {
        return res;
        }

      )
      .catch((err) => {    return err;
    }   );
    // .catch(err=>console.log(err));
};
export const setCookie=(key, value)=>{
    if(process.browser){
        coockie.set(key,value,{ expires:1})
    }
}
export const removeCookie=(key)=>{
    if(process.browser){
        coockie.remove(key,{ expires:1})
    }
}
export const getCookie=(key)=>{
    if(process.browser){
        return coockie.get(key);
    }
}
export const setLocalStorage=(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removeLocalStorage=(key)=>{
    if(process.browser){
        localStorage.removeItem(key);
    }
}
export const authenticate=(data,next)=>{
    setCookie('token',data.token);
    setLocalStorage('user',data.user);
    next();
}
export const isAuth=()=>{
    if(process.browser){
        const coockieChecked= getCookie('token');
        if(coockieChecked){

            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                return null;
            }
        }else return null;
    }
}