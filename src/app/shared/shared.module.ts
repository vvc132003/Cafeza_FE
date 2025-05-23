import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MessageTreeComponent } from './chat/message-tree/message-tree.component';
import { MessageNodeComponent } from './chat/message-tree/message-node/message-node.component';



@NgModule({
  declarations: [ChatComponent, MessageTreeComponent, MessageNodeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChatComponent] 
})
export class SharedModule { }
