import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JogadorComponent } from './jogador.component';
import { JogadorService } from "./jogador.service";

@NgModule({
  declarations: [JogadorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [JogadorComponent]
})
export class JogadorModule { }
