import { TestBed, inject, async } from '@angular/core/testing';
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

  it('Cria o serviço do jogador.', () => {
    const service: JogadorService = TestBed.get(JogadorService);
    expect(service).toBeTruthy();
  });
  
  it('Valida busca de personagem na API da Marvel com personagem que existe.', async(inject([JogadorService], (service: JogadorService) => {
    service.getNomeJogador("Captain Marvel (Carol Danvers)").subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"];
        let result = dados["results"];
        let jogadores = new Array<Jogador>();
        let nome: string;

        jogadores = result;

        for (let jogador of jogadores) {
          nome = jogador.name;
        }
        expect(nome).toEqual("Captain Marvel (Carol Danvers)");
      }
    );
  })));

  it('Valida busca de personagem na API da Marvel com personagem que não existe.', async(inject([JogadorService], (service: JogadorService) => {
    service.getNomeJogador("Wonder Woman").subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"];
        let result = dados["results"];
        expect(result.length).toEqual(0);
      }
    );
  })));
});
