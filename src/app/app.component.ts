import { Component } from '@angular/core';
import { JogadorService } from "./jogador/jogador.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jogo da Velha';

  constructor(public jService: JogadorService){

  }

  ngOnInit(){
    console.log('Teste');
  }
}
