import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '@app/shared/services/local';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Room } from '../../interfaces';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit, OnDestroy {

  @Input() data: Room[];
  subscriptions$: Subscription[] = [];

  constructor(
    private router: Router,
    private socketService: SocketService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  confirm(room: string|undefined): void {
    this.confirmService.confirm({
      header: 'Sala de soporte',
      message: '¿Estás seguro de que quieres crear una sala de soporte?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.createAndJoinInRoom(room);
      },
      key: 'create-room'
    })
  } 

  createAndJoinInRoom(roomCode: string|undefined) {
    if(roomCode === 'undefined') return;
    this.socketService.createRoom({
      room: roomCode
    });
    this.socketService.onUserJoined().subscribe(
      res => {
        this.router.navigate(['support'], {
          queryParams: {
            room: roomCode
          }
        })
        this.messageService.add({
          severity: 'info',
          summary: 'Aviso',
          detail: `Te hemos unido a la sala de soporte #${roomCode}`
        });
      }
    );
    this.subscriptions$.push(
      this.socketService.onRoomExist().subscribe(
        res => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'La sala ya ha sido creada'
          })
        }
      )
    );
  }

}
