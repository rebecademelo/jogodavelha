import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { JogadorService } from "./jogador.service";
import { Jogador } from '../model/jogador';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jog1Selecionado: boolean;
  jog2Selecionado: boolean;

  constructor(private service: JogadorService, private toastr: ToastrService) { 
    this.service  = service;
    this.toastr   = toastr;
  }

  ngOnInit() {
    this.jog1Selecionado = false;
    this.jog2Selecionado = false;
  }

  toastrError(msg: string) {
    this.toastr.error(msg, "Erro");
  }

  buscarPersonagem(personagem: string, tipo: number) {
    this.service.getNomeJogador(personagem).subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"]
        let result = dados["results"]
        
        this.service.jogadores = result;
        
        if (this.service.jogadores.length === 0) {
          this.toastrError("Personagem não encontrado, favor buscar outro.");
          return;
        }

        if (tipo == 1) {
          for (let primJog of this.service.jogadores) {
            this.service.jogador1 = primJog;
            this.service.isJog1 = true;
            this.service.jog1.name = this.service.jogador1.name;
            this.service.jog1.thumbnail = this.service.jogador1.thumbnail;
            this.jog1Selecionado = true;
          }
        }
        
        if (tipo == 2) {
          for (let segJog of this.service.jogadores) {
            this.service.jogador2 = segJog;
            this.service.isJog2 = true;
            this.service.jog2.name = this.service.jogador2.name;
            this.service.jog2.thumbnail = this.service.jogador2.thumbnail;
            this.jog2Selecionado = true;
          }
        }

        if (this.service.isJog1 && this.service.isJog2) {
          let picker = Math.floor((Math.random() * 2) + 1);
          
          if (picker == 1) {
            this.service.jogadorX = this.service.jogador1;
            this.service.jogadorO = this.service.jogador2;
          } else if (picker == 2) {
            this.service.jogadorX = this.service.jogador2;
            this.service.jogadorO = this.service.jogador1;
          }
          
          this.setJogadorX(this.service.jogadorX);
          this.setJogadorO(this.service.jogadorO);
        }
    });
  }

  setJogadorX(jogX: Jogador) {
    this.service.jogX = jogX;
  }

  getJogadorX() {
    return this.service.jogX;
  }
  
  setJogadorO(jogO: Jogador) {
    this.service.jogO = jogO;
  }

  getJogadorO() {
    return this.service.jogO;
  }
}
