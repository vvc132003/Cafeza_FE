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
    { code: '1007', text: 'Hãy nhập số lượng lớn hoặc bé hơn số lượng hiện tại !' },
    { code: '1008', text: 'Cập nhật số lượng thành công !' },
    { code: '1009', text: 'Đã thêm vào hoá đơn !' },
    { code: '1010', text: 'Huỷ đơn thành công !' },
    { code: '1011', text: 'In hoá đơn thành công !' },
    { code: '1012', text: 'Chuyển bàn thành công !' },
    { code: '1013', text: 'Bạn chưa nhập số lượng !' },









  ];
  
  getMessageByCode(code: string) {
    const message = this.messages.find(msg => msg.code === code);
    return message ? message.text : 'Thông báo không tìm thấy!';
  }
}
