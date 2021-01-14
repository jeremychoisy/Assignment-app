import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Message, messageType} from '../../models/index';
import {MessageStore, selectErrorMessages, selectSuccessMessages} from '../../store/message/index';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {
  @Input()
  public type: messageType = 'error';

  public messages$: Observable<Message[]> = of([]);

  constructor(private store: Store<MessageStore>) {
  }

  ngOnInit(): void {
    this.messages$ = this.store.pipe(select(this.type === 'error' ? selectErrorMessages : selectSuccessMessages));
  }
}
