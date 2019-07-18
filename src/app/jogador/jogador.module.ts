import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JogadorComponent } from './jogador.component';

@NgModule({
  declarations: [JogadorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [JogadorComponent]
})
export class JogadorModule { }
