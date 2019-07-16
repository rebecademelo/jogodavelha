import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { JogadorService } from "./jogador.service";
import { Jogador } from '../model/jogador';

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
    this.service.getNomeJogador().subscribe(
      data => {
        let res = data as Response;
        let retorno = res.json();
        let dados = retorno["data"]
        let result = dados["results"]
        
        this.service.jogadores = result;
    });
  }

}
