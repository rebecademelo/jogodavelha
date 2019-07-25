import { TestBed, inject } from '@angular/core/testing';

import { JogoService } from './jogo.service';
import { HttpModule } from '@angular/http';

describe('JogoService', () => {
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ JogoService ]
    });
  });

  it('Cria o serviço do jogo.', () => {
    const service: JogoService = TestBed.get(JogoService);
    expect(service).toBeTruthy();
  });

  it('Verifica se o jogo foi iniciado.', inject([JogoService], (service: JogoService) => {
    service.setInicioJogo(true);
    let inicioJogo: boolean = service.getInicioJogo();
    
    expect(inicioJogo).toBeTruthy();
  }));

  it('Realiza uma jogada e verifica se a jogada foi do jogador X.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    service.jogar(1,1);
    let mostrarX = service.mostrarX(1,1);
    
    expect(mostrarX).toBeTruthy();
  }));

  it('Realiza uma jogada e verifica se a jogada foi do jogador O.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    service.jogar(1,1);
    let mostrarO = service.mostrarO(1,1);
    
    expect(mostrarO).toBeFalsy();
  }));

  it('Verifica se o jogo foi acabou pois houve vitória.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    service.tabuleiro[1][1] = 1;
    
    let final: boolean = service.finalJogo(1,1,1,service.tabuleiro);
    
    expect(final).toBeFalsy();
  }));

  it('Verifica se o jogo foi finalizado.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    let final: boolean = service.mostrarFinalizacao();
    
    expect(final).toBeFalsy();
  }));

  it('Verifica qual o placar do jogo para o jogador X.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    service.zerarPlacar();
    let placarJogX: number = service.getPlacarJogX();
    
    expect(placarJogX).toEqual(0);
  }));

  it('Verifica qual o placar do jogo para o jogador O.', inject([JogoService], (service: JogoService) => {
    service.iniciarJogo();
    service.zerarPlacar();
    let placarJogO: number = service.getPlacarJogO();
    
    expect(placarJogO).toEqual(0);
  }));
});
