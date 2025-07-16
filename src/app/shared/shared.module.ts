import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
// import { FormsModule } from '@angular/forms';
import { MessageTreeComponent } from './chat/message-tree/message-tree.component';
import { MessageNodeComponent } from './chat/message-tree/message-node/message-node.component';
import { ChatAiComponent } from './chat-ai/chat-ai.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent, MessageTreeComponent, MessageNodeComponent, ChatAiComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  exports: [ChatComponent,ChatAiComponent]
})
export class SharedModule { }
