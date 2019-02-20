import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { EchoComponent } from './echo/echo.component';
import { PostComponent } from './post/post.component';
import { EchoService } from './echo.service';
import { PostService } from './post.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { StatsComponent } from './stats/stats.component';
import { FaqComponent } from './faq/faq.component';

// Pipes
import { FilterPipe } from './filter.pipe';
import { QuotesPipe } from './quotes.pipe';
import { PrePipe } from './pre.pipe';
import { iiLinks } from './iilinks.pipe';
import { LinkyModule } from 'angular-linky';

// Scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Highlight
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserComponent } from './user/user.component';
import { ThreadsComponent } from './threads/threads.component';

@NgModule({
    declarations: [
        AppComponent,
        EchoComponent,
        PostComponent,
        MenuComponent,
        FilterPipe,
        QuotesPipe,
        PrePipe,
        iiLinks,
        NotfoundComponent,
        StatsComponent,
        FaqComponent,
        FavoritesComponent,
        UserComponent,
        ThreadsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        InfiniteScrollModule,
        LinkyModule,
        HighlightJsModule,
    ],
    providers: [
        EchoService,
        PostService,
        HighlightJsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
