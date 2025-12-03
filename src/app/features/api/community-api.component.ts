import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { failure, success } from "../../shared/libs/error";
import { Channel } from "../models";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { Auth, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
import { doc, Firestore, getDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root',
})

export class CommunityApiComponent {
    private firestore = inject(Firestore);

    constructor(private http: HttpClient, private auth: Auth = inject(Auth)) {}

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

    async fetchCommunityById(id: string): Promise<Channel | null> {
        const channelRef = doc(this.firestore, `channel/${id}`);
        const channelSnapshot = await getDoc(channelRef);
        if (channelSnapshot.exists()) {
            const data = channelSnapshot.data() as any;
            return {
                ...data,
            } as Channel;
        } else {
            return null;
        }
    }
}