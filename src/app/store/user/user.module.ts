import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './user.reducer';
import {UserEffects} from './user.effects';
import {USER_STORE_NAME} from './user.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_STORE_NAME, reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserStoreModule {
}
