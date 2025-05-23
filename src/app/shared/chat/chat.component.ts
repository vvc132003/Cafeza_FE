import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    // if (this.showChat == true) {
    this.scrollToBottom();
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    }, 0);
    // }
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.conversationService.stopConnection1();
    this.conversationService.stopConnection2();
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
            this.getMess(data[0]);
            this.loadsoket(this.selectedConversation);
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
    // const index = this.conversations.findIndex(c => c.conversationId === data.conversationId);
    // if (index !== -1) {
    //   const conversation = this.conversations[index];
    //   conversation.lastMessage = data.lastMessage;
    //   conversation.updatedAt = new Date(); 
    //   this.conversations.splice(index, 1);
    //   this.conversations.unshift(conversation);
    // }

    this.listmessage.messages.push({ text: data.content, senderMemberId: data.senderMemberId });
    /// người gửi thì mới laod newmessage
    if (data.senderMemberId === this.currentUserId) {
      this.newMessage = '';
    }

    this.scrollToBottom();
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


  selectedConversation = this.conversations[0];
  newMessage = '';

  showSidebar: boolean = true;
  // listmessage: any = [];
  listmessage: any = {
    messages: []
  };
  @ViewChild('messageInput') messageInput!: ElementRef;

  selectConversation(convo: any) {
    this.stopAndStartConnection(convo);
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    }, 0);
    this.isTyping = false;
  }

  async stopAndStartConnection(convo: any) {
    await this.conversationService.stopConnection1();
    await this.conversationService.stopConnection2();

    this.selectedConversation = convo;
    this.getMess(convo);
    this.loadsoket(convo);
    this.scrollToBottom();
  }

  getMess(convo: any) {
    this.conversationService.getMessages(convo.conversationId).subscribe((res: any) => {
      this.listmessage = res[0];
      // console.log(res);
    })
  }

  loadsoket(data: any) {
    // console.log(this.currentUserId);
    this.subscription.add(
      this.conversationService.startConnection1(data.conversationId).subscribe(() => {
        this.conversationService.onaddupChat().subscribe((newMes: any) => {
          this.newMess(newMes);
        });
      })
    );
    this.subscription.add(
      this.conversationService.startConnection2(this.currentUserId).subscribe(() => {
        this.conversationService.loadConversation().subscribe((data: any) => {
          this.neworupdateConversation(data);
        })
        this.conversationService.logTyping().subscribe((res: any) => {
          if (res.userId !== this.currentUserId && res.conversationId === data.conversationId) {
            this.isTyping = res.isTyping;
          } else {
            this.isTyping = false;
          }
        });
      })
    )
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

  // scrollToBottom() {
  //   setTimeout(() => {
  //     const list = document.getElementById('messageList');
  //     if (list) {
  //       list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  //     }
  //   }, 100); // delay một chút để chờ DOM render
  // }

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
      senderMemberId: this.currentUserId,
    }

    this.conversationService.postChat(data).subscribe((data) => {
      // console.log();
      this.onTyping();
    })

  }
  isTyping: boolean = false;

  typingTimer: any;
  lastIsTyping: boolean = false;

  onTyping() {
    const message = this.newMessage?.trim() || '';
    const isTyping = message.length > 0;

    if (isTyping === this.lastIsTyping) return;

    this.lastIsTyping = isTyping;

    if (!isTyping) {
      clearTimeout(this.typingTimer);
      this.sendTypingStatus(false);
    } else {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.sendTypingStatus(true);
      }, 2000);
    }
  }

  sendTypingStatus(isTyping: boolean) {
    const data = {
      conversationId: this.selectedConversation?.conversationId,
      userId: this.currentUserId,
      isTyping: isTyping,
    };

    if (data.conversationId) {
      this.conversationService.postlogTyping(data).subscribe();
    }
  }



  closeChat() {
    this.showChat = false;
    setTimeout(() => {
      this.isShowChat = false;
      this.showButton = true;
    }, 200);
  }

  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  }

 previewImageUrls: string[] = [];
selectedImageFiles: File[] = [];

onImagesSelected(event: any) {
  const files: FileList = event.target.files;
  this.previewImageUrls = [];
  this.selectedImageFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/')) {
      this.selectedImageFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}

removeImage(index: number) {
  this.previewImageUrls.splice(index, 1);
  this.selectedImageFiles.splice(index, 1);
}

}
