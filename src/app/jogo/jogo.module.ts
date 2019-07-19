import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoComponent } from './jogo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [JogoComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    JogoComponent
  ]
})
export class JogoModule { }
