import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoComponent } from './jogo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";

@NgModule({
  declarations: [JogoComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPageScrollCoreModule
  ],
  exports: [
    JogoComponent
  ]
})
export class JogoModule { }
