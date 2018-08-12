import { server_url } from './config.json'

export const log_event = new CustomEvent('user-log');

export async function request(path="", method="GET", data=null) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if(sessionStorage['Authorization-token']){
        myHeaders.append('Authorization', 'Token ' + sessionStorage['Authorization-token']);
    };

    const response = await fetch(server_url + path, {
      method: method,
      headers: myHeaders,
      mode: 'cors',
      body: data
    });
    const result = await response.json();
    return result;
}

export const emailValidation = email => /.+@{1}.+/.test(email);

export const isLogged = () => (typeof(sessionStorage['Authorization-token']) !== 'undefined');
