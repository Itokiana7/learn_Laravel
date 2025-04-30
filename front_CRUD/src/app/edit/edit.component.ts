import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();

  closePopup() {
    this.close.emit();
  }

  updatePopup(){
    this.update.emit();
  }
}
