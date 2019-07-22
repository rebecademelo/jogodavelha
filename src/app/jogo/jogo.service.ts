import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  public tamanho: number = 3;
  public tabuleiro;
  public numJogadas: number;
  public vitoria: boolean;
  public placarJogX: number;
  public placarJogO: number;
  public jogador: number;
  public mostraFim: boolean;
  public inicioJogo: boolean;

  constructor() { }

  iniciarJogo() {
    this.tabuleiro        = [3];
    this.numJogadas       = 0;
    this.vitoria          = false;
    this.mostraFim        = false;

    for (let i = 0; i < 3; i++) {
      this.tabuleiro[i] = [0, 0, 0];
    }
  }

  zerarPlacar() {
    this.placarJogX = 0;
    this.placarJogO = 0;
  }

  jogar(linha: number, coluna: number) {
    if(this.tabuleiro[linha][coluna] !== 0) {
      console.log("celula já preenchida");
      //mostrar mensagem que usuario precisa selecionar uma celula vazia
      return;
    }

    this.numJogadas++;
    console.log(this.numJogadas);

    // jogador O
    if (this.numJogadas % 2 === 0) {
      this.jogador = 2;
    } else { // jogador X
      this.jogador = 1;
    }

    this.tabuleiro[linha][coluna] = this.jogador;
    this.vitoria = this.finalJogo(linha, coluna, this.jogador, this.tabuleiro);
    
    if (!this.vitoria && this.numJogadas < 9) {
      console.log('Próxima Jogada');
    }
    // vitória
    if (this.vitoria) {
      if (this.jogador === 1) {
        this.placarJogX++;
        console.log("placar X");
        console.log(this.placarJogX);
      } else {
        this.placarJogO++;
        console.log("placar O");
        console.log(this.placarJogO);
      }
      
      console.log('Jogador: ' + this.jogador + ' ganhou');
      this.mostraFim = true;
    }
    //deu velha
    if (!this.vitoria && this.numJogadas === 9) {
      this.jogador = 0;
      console.log('Deu velha');
      this.mostraFim = true;
    }
  }

  finalJogo(linha: number, coluna: number, jogador: number, tabuleiro: any) {
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

  mostrarX(linha: number, coluna: number) {
    return this.tabuleiro[linha][coluna] === 1;
  }

  mostrarO(linha: number, coluna: number) {
    return this.tabuleiro[linha][coluna] === 2;
  }

  mostrarFinalizacao() {
    return this.mostraFim;
  }

  mostrarGanhador(): number {
    return this.jogador;
  }

  getPlacarJogX() {
    return this.placarJogX;
  }

  getPlacarJogO() {
    return this.placarJogO;
  }

  setInicioJogo(start: boolean) {
    this.inicioJogo = start;
  }

  getInicioJogo() {
    return this.inicioJogo;
  }
}
