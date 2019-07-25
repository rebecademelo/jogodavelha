import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { JogadorComponent } from './jogador.component';
import { JogadorService } from "./jogador.service";
import { JogoService } from "../jogo/jogo.service";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('JogadorComponent', () => {
  let component: JogadorComponent;
  let fixture: ComponentFixture<JogadorComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [JogadorComponent],
      providers: [JogadorService, JogoService, ToastrService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente do Jogador.', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica se existe um h2 em tela dentro da div principal do componente.', () => {
    debug = fixture.debugElement.query(By.css('.jogadorHeader'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("h2");
  });

  it('Verifica se existe uma input para busca de personagem dentro da div de seleção do jogador 1 se o jogo não foi iniciado.', () => {
    debug = fixture.debugElement.query(By.css('.jog1'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("input");
  });

  it('Verifica se existe um botão para pesquisa de personagem dentro da div de seleção do jogador 1 se o jogo não foi iniciado.', () => {
    debug = fixture.debugElement.query(By.css('.jog1'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("button");
  });

  it('Verifica se existe uma input para busca de personagem dentro da div de seleção do jogador 2 se o jogo não foi iniciado.', () => {
    debug = fixture.debugElement.query(By.css('.jog2'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("input");
  });

  it('Verifica se existe um botão para pesquisa de personagem dentro da div de seleção do jogador 2 se o jogo não foi iniciado.', () => {
    debug = fixture.debugElement.query(By.css('.jog2'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("button");
  });

  it('Verifica se o jogo foi iniciado.', inject([JogoService], (jogoService: JogoService) => {
    jogoService.setInicioJogo(true);
    let inicioJogo: boolean = component.jogoIniciado();
    
    expect(inicioJogo).toBeTruthy();
  }));
});
