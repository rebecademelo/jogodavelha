import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { JogoComponent } from './jogo.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { JogoService } from './jogo.service';
import { By } from '@angular/platform-browser';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxPageScrollCoreModule
      ],
      declarations: [ JogoComponent ],
      providers: [ ToastrService ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente do jogo.', () => {
    expect(component).toBeTruthy();
  });
  
  it('Verifica se existe uma div em tela dentro da div principal do componente.', () => {
    debug = fixture.debugElement.query(By.css('.bg'));
    element = debug.nativeElement;
    fixture.detectChanges();
    expect(element.innerHTML).toContain("div");
  });

  it('Verifica se o tabuleiro ainda não existe em tela pois o jogo não iniciou.', () => {
    expect(fixture.debugElement.query(By.css('.tabuleiro'))).toBeNull();
  });

  it('Verifica se o jogador X está undefined pois ainda não foi selecionado.', () => {
    component.iniciarJogo();
    let jogadorX = component.jogadorX;

    expect(jogadorX).toBeUndefined();
  });

  it('Verifica se o jogador O está undefined pois ainda não foi selecionado.', () => {
    component.iniciarJogo();
    let jogadorO = component.jogadorO;

    expect(jogadorO).toBeUndefined();
  });
});
