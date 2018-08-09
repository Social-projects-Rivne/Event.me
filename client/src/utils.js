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

export function dateFromString(date_str) {
  if(!date_str) return ''
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
  const date_arr  = date_str.split(' ');
  let [day, mon, year] = date_arr;
  mon = month.indexOf(mon.slice(0, -1));
  if(date_arr.length > 3){
    let [hour, min] = date_arr[3].slice(0, 5).split(":");
    date_arr[3].slice(5) === "PM" ? hour = +hour + 15 : hour = +hour +3;
    return new Date(Number(year), mon, Number(day), Number(hour), Number(min));
  } else {
    return new Date(Number(year), mon, Number(day));
  }
}
