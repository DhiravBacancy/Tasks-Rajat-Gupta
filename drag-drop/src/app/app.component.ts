import { Component } from '@angular/core';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImageUploadComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'image-upload-app';
}