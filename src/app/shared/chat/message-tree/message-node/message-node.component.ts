import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-message-node',
  templateUrl: './message-node.component.html',
  styleUrls: ['./message-node.component.scss']
})
export class MessageNodeComponent {
  @Input() message: any;
  @Input() currentUserId: string = "";
  constructor(private sanitizer: DomSanitizer) { }

  showMenu: boolean = false;

  menuMessage: any = null;

  toggleMenu(msg: any): void {
    if (this.menuMessage === msg) {
      this.showMenu = !this.showMenu;
    } else {
      this.menuMessage = msg;
      this.showMenu = true;
    }
  }
  deleteMessage(msg: any) {
    console.log("Gỡ tin nhắn:", msg);
    msg.showMenu = false;
  }
  replyMessage(msg: any) {
    // const data = {
    //   content: this.newMessage || this.iamge || "trả lời",
    //   conversationId: this.selectedConversation.conversationId,
    //   senderMemberId: this.currentUserId,
    //   parentId: msg.id
    // }

    // this.conversationService.postChatReply(data).subscribe((data) => {
    //   this.onTyping();
    //   this.previewImageUrls = [];
    // })

  }

  getYoutubeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return '';
  }


  extractYoutubeVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  }


}
