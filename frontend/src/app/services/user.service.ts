import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  //url = 'api/user';


  constructor(private httpClient: HttpClient) {}

  // Method to fetch user data for the currently logged-in user
  getUserData() {
    return this.httpClient.get(`${this.url}/user/get`);
  }

  // Method to fetch admin user data
  getAdminUserData() {
    // user has a fixed ID of 1
    const adminId = 1;
    return this.httpClient.get(`${this.url}/users/${adminId}`);
  }

  signup(data: any) {
    return this.httpClient.post(`${this.url}/user/signup`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  forgotPassword(data:any) {
    return this.httpClient.post(`${this.url}/user/forgotpassword/`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
  }

  login(data:any) {
    return this.httpClient.post(`${this.url}/user/login/`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
  }

  checkToken(){
    return this.httpClient.get(`${this.url}/user/checkToken`);
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + "/user/changePassword",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getUsers(){
    return this.httpClient.get(this.url+"/user/get/");
  }

  update(data:any){
    return this.httpClient.patch(this.url+
      "/user/update",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      })
  }
}
