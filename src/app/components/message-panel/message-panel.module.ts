import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MessagePanelComponent} from './message-panel.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [MessagePanelComponent],
  exports: [MessagePanelComponent]
})
export class MessagePanelModule {
}
