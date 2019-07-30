import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { EchoComponent } from './echo/echo.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { StatsComponent } from './stats/stats.component';
import { FaqComponent } from './faq/faq.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ThreadsComponent } from './threads/threads.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
    { path: 'msg/:id', component: PostComponent, pathMatch: "full" },
    { path: 'msg', redirectTo: '/', pathMatch: 'full' },
    { path: 'echo/:echo', component: PostComponent, pathMatch: "full" },
    { path: 'stats', component: StatsComponent, pathMatch: "full" },
    { path: 'doc/faq', component: FaqComponent, pathMatch: "full" },
    { path: 'favorites', component: FavoritesComponent, pathMatch: "full" },
    { path: 'thread/:id', component: ThreadsComponent, pathMatch: "full" },
    { path: 'new', component: NewComponent, pathMatch: "full" },
    { path: '', component: PostComponent },
    { path: '**', component: NotfoundComponent },
    // { path: '', component: EchoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
