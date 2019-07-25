import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  public tamanho: number = 3;
  public tabuleiro: any;
  public numJogadas: number;
  public vitoria: boolean;
  public placarJogX: number;
  public placarJogO: number;
  public jogador: number;
  public mostraFim: boolean;
  public inicioJogo: boolean;

  constructor() { }

  iniciarJogo() {
    // limpa as variáveis antes de iniciar o jogo
    this.tabuleiro        = [3];
    this.numJogadas       = 0;
    this.vitoria          = false;
    this.mostraFim        = false;

    for (let i = 0; i < 3; i++) {
      // inicia o tabuleiro de 3x3 com suas células vazias
      this.tabuleiro[i] = [0, 0, 0];
    }
  }

  zerarPlacar(): void {
    this.placarJogX = 0;
    this.placarJogO = 0;
  }

  jogar(linha: number, coluna: number): void {
    if(this.tabuleiro[linha][coluna] !== 0) {
      // desconsidera a jogada pois a célula que o jogador selecionou já está preenchida
      return;
    }

    this.numJogadas++;
    
    // verifica qual jogador (X ou O) está realizando a jogada atual de acordo com o número de jogadas
    if (this.numJogadas % 2 === 0) { // jogador O
      this.jogador = 2;
    } else { // jogador X
      this.jogador = 1;
    }
    
    // atribui a célula qual jogador a selecionou
    this.tabuleiro[linha][coluna] = this.jogador;
    // verifica se ouve vitoria após o jogador realizar uma jogada
    this.vitoria = this.finalJogo(linha, coluna, this.jogador, this.tabuleiro);
    
    if (!this.vitoria && this.numJogadas < 9) {
      //verifica se não ouve uma vitória ou se o número de jogadas é menor que 9 para continuar o jogo
      return;
    }
    
    // verifica se houve vitória
    if (this.vitoria) {
      if (this.jogador === 1) {
        // se o jogador X ganhou adiciona um ponto no seu placar
        this.placarJogX++;
      } else {
        // se o jogador O ganhou adiciona um ponto no seu placar
        this.placarJogO++;
      }

      this.mostraFim = true;
    }
    //deu velha
    if (!this.vitoria && this.numJogadas === 9) {
      this.jogador = 0;
      this.mostraFim = true;
    }
  }

  finalJogo(linha: number, coluna: number, jogador: number, tabuleiro: any): boolean {
    let final: boolean = false;

    // verifica se a linha do campo que o jogador marcou foi preenchida por completo por ele
    if (tabuleiro[linha][0] === jogador && 
        tabuleiro[linha][1] === jogador &&
        tabuleiro[linha][2] === jogador) {
        
        final = true;
    }

    // verifica se a coluna do campo que o jogador marcou foi preenchida por completo por ele
    if (tabuleiro[0][coluna] === jogador && 
        tabuleiro[1][coluna] === jogador &&
        tabuleiro[2][coluna] === jogador) {
      
      final = true;
    }

    // verifica se a diagonal do campo que o jogador marcou foi preenchida por completo por ele
    if ((tabuleiro[0][0] === jogador && 
         tabuleiro[1][1] === jogador &&
         tabuleiro[2][2] === jogador) 
        || 
        (tabuleiro[2][0] === jogador && 
         tabuleiro[1][1] === jogador &&
         tabuleiro[0][2] === jogador)) {
      
      final = true;
    }
    
    return final;
  }

  mostrarX(linha: number, coluna: number): boolean {
    // atribui o X para a célula selecionada caso for o primeiro jogador que realizou a jogada
    return this.tabuleiro[linha][coluna] === 1;
  }

  mostrarO(linha: number, coluna: number): boolean {
    // atribui o O para a célula selecionada caso for o segundo jogador que realizou a jogada
    return this.tabuleiro[linha][coluna] === 2;
  }

  mostrarFinalizacao(): boolean {
    // retorna se o jogo foi finalizado
    return this.mostraFim;
  }

  mostrarGanhador(): number {
    // retorna qual jogador ganhou
    return this.jogador;
  }

  getPlacarJogX(): number {
    // retorna o placar do jogador X
    return this.placarJogX;
  }

  getPlacarJogO(): number {
    // retorna o placar do jogador O
    return this.placarJogO;
  }

  setInicioJogo(start: boolean): void {
    // seta o jogo como iniciado
    this.inicioJogo = start;
  }

  getInicioJogo(): boolean {
    // retorna se o jogo foi iniciado
    return this.inicioJogo;
  }
}
