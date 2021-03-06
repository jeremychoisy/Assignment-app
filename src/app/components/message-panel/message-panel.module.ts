import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MessageStoreModule} from '../../store/message/message.module';
import {MessagePanelComponent} from './message-panel.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MessageStoreModule],
  declarations: [MessagePanelComponent],
  exports: [MessagePanelComponent]
})
export class MessagePanelModule {
}
