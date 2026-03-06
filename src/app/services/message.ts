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
    { code: '1014', text: 'Bạn chưa nhập số tiền khách hàng đưa !' },
    { code: '1015', text: 'Thêm vào giỏ hành thành công !' },
    { code: '1016', text: 'Cập nhật trạng thái thành công !' },
    { code: '1017', text: 'Món này đã huỷ, không thể hoàn món !' },
    { code: '1018', text: 'Món này đã hoàn thành, không thể hoàn món !' },
    { code: '1019', text: 'Món này chưa pha, không thể hoàn thành !' },
    { code: '1020', text: 'Có món mới !' },
    { code: '1021', text: 'Thanh toán thành công !' },
    { code: '1022', text: 'Chưa thể thanh toán !' },


    { code: '1023', text: 'Thêm món thành công !' },
    { code: '1024', text: 'Cập nhật món thành công !' },
    { code: '1025', text: 'Xoá món thành công !' },


    { code: '1026', text: 'Thêm loại món thành công !' },
    { code: '1027', text: 'Cập nhật loại thành công !' },
    { code: '1028', text: 'Xoá loại món thành công !' },


    { code: '1029', text: 'Thêm nhân viên thành công !' },
    { code: '1030', text: 'Vui lòng nhập đầy đủ thông tin !' },
    { code: '1031', text: 'Cập nhật nhân viên thành công !' },



















  ];

  getMessageByCode(code: string) {
    const message = this.messages.find(msg => msg.code === code);
    return message ? message.text : 'Thông báo không tìm thấy!';
  }
}
