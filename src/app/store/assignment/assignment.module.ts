import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AssignmentEffects} from './assignment.effects';
import {reducer} from './assignment.reducer';
import {ASSIGNMENT_STORE_NAME} from './assignment.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ASSIGNMENT_STORE_NAME, reducer),
    EffectsModule.forFeature([AssignmentEffects])
  ]
})
export class AssignmentStoreModule {
}
