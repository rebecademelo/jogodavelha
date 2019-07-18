import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Jogador } from "./../model/jogador";
import { Md5 } from 'ts-md5/dist/md5';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {
  public jogadores = new Array<Jogador>();
  jogador1: Jogador;
  jogador2: Jogador;
  
  jogX: Jogador;
  jogO: Jogador;

  jogadorX: Jogador;
  jogadorO: Jogador;

  public jog1: Jogador = new Jogador("", "");
  public jog2: Jogador = new Jogador("", "");

  isJog1: boolean;
  isJog2: boolean;

  constructor(private http:Http) { 
    
  }

  getNomeJogador(name) {
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + '5b11c81d22bf12e95875873f039ce3ad0dab666e' + '331c004ec798621bab61b479f4b36e11');

    let url = 'http://gateway.marvel.com/v1/public/characters';
    let params = "?apikey=331c004ec798621bab61b479f4b36e11"
               + "&ts=" + timestamp
               + "&hash=" + hash
               + "&name=" + name;
    return this.http.get(url + params).pipe(map((res: Response) => res));
  }
}
