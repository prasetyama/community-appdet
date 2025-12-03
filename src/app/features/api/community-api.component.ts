import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { failure, success } from "../../shared/libs/error";
import { payloadNewReq } from "../models";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { Auth, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class CommunityApiComponent {

    constructor(private http: HttpClient, private auth: Auth = inject(Auth)) {
     }

    async regisChannel(payload: any) {
        const header = { 'Content-Type': 'application/json' };   
        try {
            const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/regUserByChannelPublic`, {data: payload}, { headers: header }));
            return success(result);
        } catch (error) {
            const errors = error as HttpErrorResponse;
            return failure(errors);
        }
    }

    async googleSignIn() {
        const provider = new GoogleAuthProvider();
        try {
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(this.auth, provider);
            return success(result);
        } catch (error) {
            return failure('AUTH.USER_SIGN_IN_FAILED');
        }
    }
}