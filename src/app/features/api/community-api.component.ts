import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { failure, success } from "../../shared/libs/error";
import { payloadNewReq } from "../models";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})

export class CommunityApiComponent {

    constructor(private http: HttpClient) {
     }

    async regisChannel(payload: payloadNewReq) {
        const header = { 'Content-Type': 'application/json' };   
        try {
            const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/regUserByChannelPublic`, {data: payload}, { headers: header }));
            return success(result);
        } catch (error) {
            const errors = error as HttpErrorResponse;
            return failure(errors);
        }
    }
}