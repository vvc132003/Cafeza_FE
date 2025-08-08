import { Component } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  image = {
    name: 'Hình ảnh đẹp',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g14K2Main1VUMYyLhXKTfK3x8dq8ZnuI7A&s'
  };

  showName = false;
  hovering = false;
}
