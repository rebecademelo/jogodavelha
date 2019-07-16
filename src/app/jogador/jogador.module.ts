import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorComponent } from './jogador.component';
import { JogadorService } from "./jogador.service";

@NgModule({
  declarations: [JogadorComponent],
  imports: [
    CommonModule
  ],
  exports: [JogadorComponent]
})
export class JogadorModule { }
