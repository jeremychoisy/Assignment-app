import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UserEffects} from './user.effects';
import {reducer} from './user.reducer';
import {USER_STORE_NAME} from './user.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_STORE_NAME, reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserStoreModule {
}
