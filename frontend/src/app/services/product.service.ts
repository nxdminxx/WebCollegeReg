import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + "/room/add/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  update(data: any) {
    return this.httpClient.patch(this.url + "/room/update/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getProducts() {
    return this.httpClient.get(this.url + "/room/get/")
  }

  updateStatus(data: any) {
    return this.httpClient.patch(this.url + "/room/updateStatus/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  delete(id: any) {
    return this.httpClient.delete(this.url + "/room/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getProductsByCategory(id: any) {
    return this.httpClient.get(this.url + "/room/getByCategory/" + id);
  }

  getById(id: any) {
    return this.httpClient.get(this.url + "/room/getById/" + id);
  }
}