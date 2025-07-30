import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  @ViewChild('createMenuPhotoInput') createMenuPhotoInput!: ElementRef<HTMLInputElement>;
  
  basicInformation: FormGroup;
  isImageUploading = false;
  progress = 0;
  imgErr = { isErr: false, text: '' };

  constructor(private fb: FormBuilder) {
    this.basicInformation = this.fb.group({
      imageUrl: [''],
      imageName: [''],
      imageSize: [0]
    });
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    document.getElementsByClassName('draggable-key-image')[0]?.classList.add('dragging');
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    document.getElementsByClassName('draggable-key-image')[0]?.classList.remove('dragging');
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.handleDragLeave(event);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
    target.value = ''; // Reset input
  }

  private processFile(file: File): void {
    // Validate file
    if (!file.type.match('image/(jpeg|png)')) {
      this.imgErr = { isErr: true, text: 'Only JPEG or PNG files are allowed' };
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.imgErr = { isErr: true, text: 'File size must be less than 2MB' };
      return;
    }

    // Clean up previous image
    if (this.basicInformation.get('imageUrl')?.value) {
      URL.revokeObjectURL(this.basicInformation.get('imageUrl')?.value);
    }

    // Update form controls
    this.basicInformation.patchValue({
      imageUrl: URL.createObjectURL(file),
      imageName: file.name,
      imageSize: file.size
    });

    // Start upload simulation
    this.isImageUploading = true;
    this.progress = 0;
    this.imgErr = { isErr: false, text: '' };
    this.simulateUpload();
  }

  private simulateUpload(): void {
    const interval = setInterval(() => {
      if (this.progress >= 100) {
        this.isImageUploading = false;
        clearInterval(interval);
        return;
      }
      this.progress = Math.min(this.progress + Math.random() * 15, 100);
    }, 200);
  }

  deleteImage(): void {
    if (this.basicInformation.get('imageUrl')?.value) {
      URL.revokeObjectURL(this.basicInformation.get('imageUrl')?.value);
    }
    this.basicInformation.reset();
    this.isImageUploading = false;
    this.progress = 0;
    this.imgErr = { isErr: false, text: '' };
  }

  transform(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}