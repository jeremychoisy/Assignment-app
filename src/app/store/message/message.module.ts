import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducer} from './message.reducer';
import {MESSAGE_STORE_NAME} from './message.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(MESSAGE_STORE_NAME, reducer),
  ]
})
export class MessageStoreModule {
}
