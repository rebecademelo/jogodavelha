import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { JogadorService } from "./jogador.service";
import { Jogador } from '../model/jogador';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {

  constructor(private service: JogadorService) { 
    this.service = service;
  }

  ngOnInit() {
    
  }

  buscarPersonagem(personagem: string, tipo: number) {
    this.service.getNomeJogador(personagem).subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"]
        let result = dados["results"]
        
        this.service.jogadores = result;

        if (tipo == 1) {
          for (let primJog of this.service.jogadores) {
            this.service.jogador1 = primJog;
            this.service.isJog1 = true;
            this.service.jog1.name = this.service.jogador1.name;
            this.service.jog1.thumbnail = this.service.jogador1.thumbnail;
          }
        }

        if (tipo == 2) {
          for (let segJog of this.service.jogadores) {
            this.service.jogador2 = segJog;
            this.service.isJog2 = true;
            this.service.jog2.name = this.service.jogador2.name;
            this.service.jog2.thumbnail = this.service.jogador2.thumbnail;
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
        }
    });
  }

}
