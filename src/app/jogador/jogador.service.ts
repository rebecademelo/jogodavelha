import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Jogador } from "./../model/jogador";
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {
  // variavéis utilizadas pelo componente do jogador
  public jogador: Jogador;
  public jogador1: Jogador;
  public jogador2: Jogador;
  
  public jogX: Jogador;
  public jogO: Jogador;

  public jogadorX: Jogador;
  public jogadorO: Jogador;

  public jog1: Jogador = new Jogador("", "");
  public jog2: Jogador = new Jogador("", "");

  public isJog1: boolean;
  public isJog2: boolean;

  constructor(private httpClient: HttpClient) { 
    
  }

  getNomeJogador(name: string) {
    // faz uma consulta na API da Marvel buscando o personagem escolhido pelo nome
    var timestamp = Number(new Date());
    var hash      = Md5.hashStr(timestamp + '5b11c81d22bf12e95875873f039ce3ad0dab666e' + '331c004ec798621bab61b479f4b36e11');

    const url     = 'http://gateway.marvel.com/v1/public/characters';
    var params    = new HttpParams()
                        .set('apikey', '331c004ec798621bab61b479f4b36e11')
                        .set('ts', timestamp.toString())
                        .set('hash', hash.toString())
                        .set('name', name);

    return this.httpClient.get(url, { params: params }).pipe();
  }
}
