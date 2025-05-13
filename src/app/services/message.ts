import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = [
    { code: '1001', text: 'Bạn chưa chọn nội thất!' },
    { code: '1002', text: 'Thêm bản thành công!' },
    { code: '1003', text: 'Tạo đơn thành công!' },
    { code: '1004', text: 'Bàn chưa có đơn!' },
    { code: '1005', text: 'Thêm khu vực thành công!' },
    { code: '1006', text: 'Sản phẩm này đã hết!' },


  ];
  
  getMessageByCode(code: string) {
    const message = this.messages.find(msg => msg.code === code);
    return message ? message.text : 'Thông báo không tìm thấy!';
  }
}
