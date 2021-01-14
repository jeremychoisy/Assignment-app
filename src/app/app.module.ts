import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AssignmentsListModule} from './components/assignments-list/assignments-list.module';
import {MessagePanelModule} from './components/message-panel/message-panel.module';
import {AppLayoutModule} from './layout/app-layout/app-layout.module';
import {MessageStoreModule} from './store/message/message.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MessageStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...!environment.production ? [StoreDevtoolsModule.instrument({maxAge: 25})] : [],
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MessagePanelModule,
    AppLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    AssignmentsListModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
