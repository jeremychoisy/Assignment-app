import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ASSIGNMENT_STORE_NAME} from './assignment.state';
import {reducer} from './assignment.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AssignmentEffects} from './assignment.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ASSIGNMENT_STORE_NAME, reducer),
    EffectsModule.forFeature([AssignmentEffects])
  ]
})
export class AssignmentStoreModule {
}
