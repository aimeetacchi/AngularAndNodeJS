import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DataService {

  private addDog_url: string;

  constructor(public http: HttpClient) {
  	console.log("data service connected")
  }

  // Adding Dog Method
  addDog(data){
  	// add dog server route ---
	this.addDog_url = 'http://localhost:4000/api/addDog';

	  // Set up headers
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
    
    // Body of Data being sent to server
    const body = {
      'name': data.name,
      'breed': data.breed
    };
    console.log(body);
    return this.http.post(this.addDog_url, body, { headers : headers });
  }

}
