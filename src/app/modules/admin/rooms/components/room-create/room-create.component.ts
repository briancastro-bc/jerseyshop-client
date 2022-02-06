import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoomsService } from '../../services';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  roomForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomsService
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      limit: [2, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.roomService.createRoom(this.roomForm.value).subscribe();
  }

  get name() {
    return this.roomForm.get('name');
  }

  get limit() {
    return this.roomForm.get('limit');
  }

}
