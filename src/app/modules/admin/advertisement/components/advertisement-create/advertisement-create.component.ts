import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '@app/common/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.scss']
})
export class AdvertisementCreateComponent implements OnInit {

  advertisementForm: FormGroup;
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  active: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.advertisementForm = this.formBuilder.group({
      title: [null, [
        Validators.required, 
        Validators.maxLength(35)
      ]],
      hyperlink: [null, []],
      description: [null, [
        Validators.required, 
        Validators.maxLength(299)
      ]],
      is_active: [true, []],
      is_public: [true, []],
      expired_date: [null, []],
      notify: [false, []]
    });
  }

  onSubmit(): void {
    this.notificationService.createNotification(this.advertisementForm.value).subscribe({
      next: (_) => {
        this.ref.close();
      }
    })
  }

  get title() {
    return this.advertisementForm.get('title');
  }

  get hyperlink() {
    return this.advertisementForm.get('hyperlink');
  }

  get description() {
    return this.advertisementForm.get('description');
  }

  get is_active() {
    return this.advertisementForm.get('is_active');
  }

  get is_public() {
    return this.advertisementForm.get('is_public');
  }

  get expired_date() {
    return this.advertisementForm.get('expired_date');
  }

  get notify() {
    return this.advertisementForm.get('notify');
  }
}
