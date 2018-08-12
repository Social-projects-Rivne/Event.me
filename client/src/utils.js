import { server_url } from './config.json'

export async function request(path="", method="GET", data=null){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if(sessionStorage['Authorization-token']){
        myHeaders.append('Authorization', 'Token ' + sessionStorage['Authorization-token']);
    }

    let response = await fetch(server_url + path, {
      method: method,
      headers: myHeaders,
      mode: 'cors',
      body: data
    });
    let result = await response.json();
    return result
}

export function emailValidation(email){
    return /.+@{1}.+/.test(email);
}

export function isLogged() {
  return typeof (sessionStorage['Authorization-token']) !== 'undefined'
};
