import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ChallengedModalComponent } from './challenged/modal.challenged.component';
import { WaitingModalComponent } from './waiting/modal.waiting.component';
import { DeclinedModalComponent } from './declined/modal.declined.component';
import { GameOverModalComponent } from './gameOver/modal.gameover.component';
import { SharedModule } from '../shared.module';
import { ModalService } from './modal.service';

@NgModule({
  imports: [SharedModule],
  declarations: [ModalComponent,
    ChallengedModalComponent,
    WaitingModalComponent,
    DeclinedModalComponent,
    GameOverModalComponent
  ],
  providers: [ModalService],
  exports: [ModalComponent]
})
export class ModalModule { }
