import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Response } from '@angular/http';

import { JogadorService } from './jogador.service';
import { Jogador } from '../model/jogador';

describe('JogadorService', () => {
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ JogadorService ]
    });
  });
  
  it('Valida busca de personagem na API da Marvel', inject([JogadorService], (service: JogadorService) => {
    let jogadores = new Array<Jogador>();
    let nome: string;
    service.getNomeJogador("Hulk").subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"];
        let result = dados["results"];
        
        jogadores = result;

        for (let jogador of jogadores) {
          nome = jogador.name;
        }
        expect(nome).toEqual("Hulk");
      }
    );
  }));
});
