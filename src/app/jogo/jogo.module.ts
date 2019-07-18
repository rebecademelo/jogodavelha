import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoComponent } from './jogo.component';

@NgModule({
  declarations: [JogoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    JogoComponent
  ]
})
export class JogoModule { }
