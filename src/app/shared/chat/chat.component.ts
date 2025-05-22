import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConversationService } from 'src/app/services/conversation.service';
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  isShowChat: boolean = false;
  showChat: boolean = false;
  showButton: boolean = true
  toggleChat() {
    this.isShowChat = true;
    setTimeout(() => {
      this.showChat = true;
      this.showButton = false;

    }, 0);
  }
  conversations: any[] = [
    // {
    //   name: 'Nguyễn Văn A',
    //   avatar: 'https://i.pravatar.cc/150?img=3',
    //   lastMessage: 'Bạn còn hàng không?',
    //   messages: [
    //     { text: 'Chào bạn, shop còn hàng không?', fromSelf: false },
    //     { text: 'Dạ còn bạn nhé!', fromSelf: true }
    //   ]
    // },
    // {
    //   name: 'Trần Thị B',
    //   avatar: 'https://i.pravatar.cc/150?img=5',
    //   lastMessage: 'Ship về Hà Nội bao lâu?',
    //   messages: [
    //     { text: 'Shop ơi, ship về Hà Nội bao lâu?', fromSelf: false },
    //     { text: 'Tầm 2-3 ngày bạn nhé.', fromSelf: true }
    //   ]
    // }
  ];
  currentUserId: string = "";
  private subscription: Subscription = new Subscription();

  constructor(private conversationService: ConversationService, private cookieService: CookieService, private cdr: ChangeDetectorRef) {
    const token = this.cookieService.get('access_token');
    if (token) {
      const decoded: any = jwt_decode(token);
      this.currentUserId = decoded.id;
    }
    // console.log(this.currentUserId);
  }
  ngOnInit(): void {
    this.fetChat();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.conversationService.stopConnection();
  }

  fetChat() {
    this.subscription.add(
      this.conversationService.postData().subscribe((data: any) => {
        // this.conversations = data;
        // this.selectedConversation = this.conversations[0];
        if (data === true) {
          this.conversationService.getConversations().subscribe((data: any) => {
            this.conversations = data;
            // console.log(data);
            this.selectedConversation = this.conversations[0];
            this.subscription.add(
              this.conversationService.startConnection(this.selectedConversation.conversationId).subscribe(() => {
                if (this.subscription) {
                  this.subscription.unsubscribe();
                }
                this.conversationService.onaddupChat().subscribe((newMes: any) => {
                  this.newMess(newMes);
                });
              })
            )
            // this.cdr.detectChanges();
          })
        }
      })
    )
  }

  newMess(data: any) {
    // console.log("ok");
    // console.log(data);
    // this.conversations.unshift(data);
    // if (this.newMessage.trim()) {
    const conversation = this.conversations.find(c => c.conversationId === data.conversationId);
    if (conversation) {
      conversation.lastMessage = data.lastMessage;
    }
    this.selectedConversation.messages.push({ text: data.content, senderMemberId: data.senderMemberId });
    this.newMessage = '';
   
    this.scrollToBottom();
    // }
  }

  selectedConversation = this.conversations[0];
  newMessage = '';

  showSidebar: boolean = true;

  selectConversation(convo: any) {
    this.stopAndStartConnection(convo);
  }

  async stopAndStartConnection(convo: any) {
    await this.conversationService.stopConnection();
    this.selectedConversation = convo;

    this.subscription.add(
      this.conversationService.startConnection(convo.conversationId).subscribe(() => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.conversationService.onaddupChat().subscribe((newMes: any) => {
          this.newMess(newMes);
        });
      })
    );
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const list = document.getElementById('messageList');
      if (list) {
        list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
      }
    }, 100); // delay một chút để chờ DOM render
  }

  searchTerm: string = '';

  onSearchChange() {
    // code lọc conversations dựa vào searchTerm
    this.conversations = this.conversations.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sendMessage() {
    // if (this.newMessage.trim()) {
    //   this.selectedConversation.messages.push({ text: this.newMessage, fromSelf: true });
    //   this.newMessage = '';
    //   setTimeout(() => {
    //     const list = document.getElementById('messageList');
    //     list?.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
    //   });
    // }
    const data = {
      content: this.newMessage,
      conversationId: this.selectedConversation.conversationId,
      senderMemberId: this.currentUserId
    }

    this.conversationService.postChat(data).subscribe((data) => {
      // console.log();
    })

  }

  closeChat() {
    this.showChat = false;
    setTimeout(() => {
      this.isShowChat = false;
      this.showButton = true;
    }, 200);
  }
}
