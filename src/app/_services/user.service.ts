import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static baseUrl ="http://localhost:6565/";

    constructor(private http: Http,private httpc:HttpClient) { }
    postfitnessdata(data){
      return this.httpc.post(UserService.baseUrl+'allfriends',data);
    }
    getfitnessdata() {
      return this.httpc.get(UserService.baseUrl+'allfriends');
    }
    deleteFitnessData(data){
        return this.httpc.delete(UserService.baseUrl+'allfriends/'+data.id);
    }
    putFitnessData(data){
      return this.httpc.put(UserService.baseUrl+'allfriends/'+data.id,data);
    }
    postContactusData(data){
      return this.httpc.post(UserService.baseUrl+'contactus/',data);
    }
    
}