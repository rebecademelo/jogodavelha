import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JogadorService } from "./jogador/jogador.service";
import { JogadorModule } from "./jogador/jogador.module";
import { JogoService } from "./jogo/jogo.service";
import { JogoModule } from "./jogo/jogo.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    JogadorModule,
    JogoModule
  ],
  providers: [JogadorService, JogoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
