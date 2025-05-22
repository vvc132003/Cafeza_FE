import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

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
  constructor(private conversationService: ConversationService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.fetChat();
  }

  fetChat() {
    this.conversationService.postData().subscribe((data: any) => {
      // this.conversations = data;
      // this.selectedConversation = this.conversations[0];
      if (data === true) {
        this.conversationService.getConversations().subscribe((data: any) => {
          this.conversations = data;
          this.selectedConversation = this.conversations[0];
          this.cdr.detectChanges();
        })
      }
    })
  }

  selectedConversation = this.conversations[0];
  newMessage = '';

  showSidebar: boolean = true;

  selectConversation(convo: any) {
    this.selectedConversation = convo;
  }
  searchTerm: string = '';

  onSearchChange() {
    // code lọc conversations dựa vào searchTerm
    this.conversations = this.conversations.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedConversation.messages.push({ text: this.newMessage, fromSelf: true });
      this.newMessage = '';
      setTimeout(() => {
        const list = document.getElementById('messageList');
        list?.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
      });
    }
  }

  closeChat() {
    this.showChat = false;
    setTimeout(() => {
      this.isShowChat = false;
      this.showButton = true;
    }, 200);
  }
}
