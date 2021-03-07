import {
  NgModule,
} from '@angular/core';
import {StatusIconPipe} from './status-icon.pipe';


@NgModule({
  declarations: [StatusIconPipe],
  exports: [StatusIconPipe]
})
export class StatusIconPipeModule {}
