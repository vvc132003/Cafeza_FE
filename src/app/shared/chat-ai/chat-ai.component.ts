import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ConversationService } from 'src/app/services/conversation.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.scss']
})
export class ChatAiComponent implements OnInit, OnDestroy, OnChanges {
  isShowChat: boolean = false;
  showChat: boolean = false;
  showButton: boolean = false;
  conversations: any[] = [];
  selectedConversation = this.conversations[0];
  newMessage = '';
  isChatMainVisible: boolean = false;
  isChatSidebarVisible: boolean = false;
  @ViewChild('messageInput') messageInput!: ElementRef;

  backToSidebar() {
    this.isChatSidebarVisible = true;
    this.isChatMainVisible = false;
  }

  toggleChat() {
    this.isShowChat = true;
    setTimeout(() => {
      this.showChat = true;
      this.showButton = false;
      if (window.innerWidth <= 470) {
        this.isChatSidebarVisible = true;
        this.isChatMainVisible = false;
      } else {
        this.isChatSidebarVisible = true;
        this.isChatMainVisible = true;
      }

    }, 0);
    // if (this.showChat == true) {
    this.scrollToBottom();
    setTimeout(() => {
      if (this.messageInput) {
        this.messageInput.nativeElement.focus();
      }
    }, 200);
    // }
  }

  closeChat() {
    this.showChat = false;
    setTimeout(() => {
      this.isShowChat = false;
      this.showButton = true;
    }, 200);
  }

  private subscription: Subscription = new Subscription();
  currentUserId: string = "";

  constructor(private datePipe: DatePipe, private conversationService: ConversationService, private cookieService: CookieService, private cdr: ChangeDetectorRef) {
    const token = this.cookieService.get('access_token');
    if (token) {
      const decoded: any = jwt_decode(token);
      this.currentUserId = decoded.id;
      this.showButton = true;
    }
  }


  ngOnInit(): void {
    // this.fetchatAI();
  }



  @Input() data: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      const filtered = this.data.filter((conv: any) => conv.name === 'Bot');
      this.conversations = filtered;
      // console.log(this.conversations);
      // this.allConversations = filtered;
      // this.selectedConversation = this.conversations[0];
      if (filtered.length > 0 && filtered[0]) {
        this.selectedConversation = filtered[0];
        this.getMess(this.selectedConversation);
        this.loadsoket(this.selectedConversation);
      } else {
        this.selectedConversation = null;
      }
    }
  }


  listmessage: any = {
    messages: []
  };
  currentPage: number = 1;
  pageSize: number = 100;
  isLoading: boolean = false;

  getMess(convo: any, loadMore: boolean = false) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.conversationService.getMessages(convo.conversationId, this.currentPage, this.pageSize).subscribe((res: any) => {
      const newMessages = res[0].messages;
      // console.log(newMessages);
      if (loadMore) {
        const chatElement = this.chatContent.nativeElement;
        const oldScrollHeight = chatElement.scrollHeight;
        this.listmessage.messages = [...newMessages, ...this.listmessage.messages];
        setTimeout(() => {
          const newScrollHeight = chatElement.scrollHeight;
          chatElement.scrollTop = newScrollHeight - oldScrollHeight;
          this.isLoading = false;
        }, 0);
        // console.log("1");
      } else {
        this.listmessage.messages = newMessages;
        this.isLoading = false;
        this.scrollToBottom();
        // console.log("2", this.listmessage.messages);
      }
    });
  }

  onScroll() {
    if (!this.chatContent) return;
    const chatElement = this.chatContent.nativeElement;
    if (chatElement.scrollTop === 0 && !this.isLoading) {
      this.loadMoreMessages(this.selectedConversation);
    }
  }

  loadMoreMessages(convo: any) {
    this.currentPage++;
    this.pageSize = 10;
    this.getMess(convo, true);
  }

  loadsoket(data: any) {
    // console.log(this.currentUserId);
    this.subscription.add(
      this.conversationService.startConnection1(data.conversationId).subscribe(() => {
        this.conversationService.onaddupChat().subscribe((newMes: any) => {
          this.newMess(newMes);
        });
        this.conversationService.onaddupChatAL().subscribe((newMes: any) => {
          this.newMessAL(newMes);
        });
      })
    );
    // this.subscription.add(
    //   this.conversationService.startConnection2(this.currentUserId).subscribe(() => {
    //     this.conversationService.loadConversation().subscribe((data: any) => {
    //       this.neworupdateConversation(data);
    //     })
    //     this.conversationService.logTyping().subscribe((res: any) => {
    //       if (res.userId !== this.currentUserId && res.conversationId === data.conversationId) {
    //         this.isTyping = res.isTyping;
    //       } else {
    //         this.isTyping = false;
    //       }
    //     });
    //   })
    // )
  }

  newMessAL(data: any) {
    // console.log(data);
    // console.log("ok");
    // console.log(data);
    // this.conversations.unshift(data);
    // if (this.newMessage.trim()) {
    // const index = this.conversations.findIndex(c => c.conversationId === data.conversationId);
    // if (index !== -1) {
    //   const conversation = this.conversations[index];
    //   conversation.lastMessage = data.lastMessage;
    //   conversation.updatedAt = new Date(); 
    //   this.conversations.splice(index, 1);
    //   this.conversations.unshift(conversation);
    // }

    this.listmessage.messages = [
      ...this.listmessage.messages,
      { id: data.id, text: data.content, senderMemberId: data.senderMemberId, messageType: data.messageType, parentId: data.parentId, createdAt: data.createdAt, fullename: data.fullename }
    ];
    // console.log(this.listmessage.messages);

    /// người gửi thì mới laod newmessage
    if (data.senderMemberId === this.currentUserId) {
      this.newMessage = '';
    }

    this.scrollToBottom();
    // const message = {
    //   message: data.content
    // }
    // this.subscription.add(
    //   this.conversationService.postChatAI(message).subscribe((data: any) => {
    //     console.log(data);
    //   })
    // )

    // }
  }

  newMess(data: any) {
    // console.log("ok");
    // console.log(data);
    // this.conversations.unshift(data);
    // if (this.newMessage.trim()) {
    // const index = this.conversations.findIndex(c => c.conversationId === data.conversationId);
    // if (index !== -1) {
    //   const conversation = this.conversations[index];
    //   conversation.lastMessage = data.lastMessage;
    //   conversation.updatedAt = new Date(); 
    //   this.conversations.splice(index, 1);
    //   this.conversations.unshift(conversation);
    // }

    this.listmessage.messages = [
      ...this.listmessage.messages,
      { id: data.id, text: data.content, senderMemberId: data.senderMemberId, messageType: data.messageType, parentId: data.parentId, createdAt: data.createdAt, fullename: data.fullename }
    ];
    // console.log(this.listmessage.messages);

    /// người gửi thì mới laod newmessage
    if (data.senderMemberId === this.currentUserId) {
      this.newMessage = '';
    }

    this.scrollToBottom();
    const messagedt = {
      message: data.content,
      conversationId: data.conversationId
    }
    // console.log(messagedt);
    this.subscription.add(
      this.conversationService.postChatAI(messagedt).subscribe((data: any) => {
        console.log(data.intent.name);
      })
    )

    // }
  }
  neworupdateConversation(data: any) {
    // console.log(data);
    const index = this.conversations.findIndex(
      c => String(c.conversationId) === String(data.conversationId)
    );

    if (index !== -1) {
      const conversation = this.conversations[index];
      conversation.lastMessage = data.lastMessage;
      conversation.updatedAt = new Date();
      conversation.messageType = data.messageType;
      conversation.createdAt = data.createdAt;

      this.conversations.splice(index, 1);
      this.conversations.unshift(conversation);
    } else {
      data.updatedAt = new Date();
      this.conversations.unshift(data);
    }
    // const index = this.conversations.findIndex(co => co.conversationId === data.conversationId);
    // data.lastMessage = data.lastMessage;
    // if (index === -1) {
    //   this.conversations.unshift(data);
    // } else {
    //   this.conversations[index] = data;
    // }
  }

  @ViewChild('chatContent') chatContent!: ElementRef;
  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContent) {
        const chatElement = this.chatContent.nativeElement;
        chatElement.scrollTop = chatElement.scrollHeight;
      }
    }, 50);
  }



  // fetchatAI() {
  //   this.subscription.add(
  //     this.conversationService.postData_Chat_AI().subscribe((data: any) => {
  //       if (data === true) {
  //         this.conversationService.getConversations().subscribe((data: any) => {
  //         })
  //       }
  //     })
  //   )
  // }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.conversationService.stopConnection1();
    this.conversationService.stopConnection2();
  }

  selectConversation(convo: any) {
    // this.stopAndStartConnection(convo);
    // setTimeout(() => {
    //   this.messageInput.nativeElement.focus();
    // }, 0);
    // this.isTyping = false;
  }

  sendMessage() {
    const data = {
      content: this.newMessage,
      conversationId: this.selectedConversation.conversationId,
      senderMemberId: this.currentUserId,
    }
    this.conversationService.postChat(data).subscribe((data) => {
      // console.log();
    })
  }


  getFormattedTime(dateStr: string | Date): string | null {
    const date = new Date(dateStr);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return null;
    }
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (diffMinutes < 1) {
      return 'Vừa xong';
    } else if (diffMinutes < 60 && isToday) {
      return `${diffMinutes} phút trước`;
    } else if (isToday) {
      return this.datePipe.transform(date, 'HH:mm') ?? 'ngày';
    } else if (isYesterday) {
      return `Hôm qua ${this.datePipe.transform(date, 'HH:mm') ?? ''}`;
    } else if (date.getFullYear() === now.getFullYear()) {
      return this.datePipe.transform(date, 'dd/MM HH:mm') ?? '';
    } else {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') ?? '';
    }
  }

}
