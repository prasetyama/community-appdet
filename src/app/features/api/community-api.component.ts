import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { failure, success } from "../../shared/libs/error";
import { payloadNewReq } from "../models";
import { getFunctions, httpsCallable } from "@angular/fire/functions";

@Injectable({
    providedIn: 'root',
})

export class CommunityApiComponent {

    constructor(private http: HttpClient) {
     }

    async regisChannel(payload: payloadNewReq) {
        try {
            const functions = getFunctions(undefined, 'asia-southeast2');
            const callable = httpsCallable(functions, 'regUserByChannelPublic');
            try {
                const result = await callable(
                    payload
                );
                return success(result);
            } catch (error) {
                const errors = error as HttpErrorResponse;
                return failure(errors);
            }
        } catch (error) {
            const errors = error as HttpErrorResponse;
            return failure(errors);
        }
    }
}