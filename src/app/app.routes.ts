import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

export const routes: Routes = [
    {
        path: ':channelId',
        component: AppComponent
    }
]