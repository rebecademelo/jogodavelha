import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JogadorComponent } from './jogador.component';
import { JogadorService } from "./jogador.service";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('JogadorComponent', () => {
  let component: JogadorComponent;
  let fixture: ComponentFixture<JogadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [JogadorComponent],
      providers: [JogadorService, ToastrService],
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

  it('should create', inject([JogadorService, ToastrService], (service: JogadorService, toastrService: ToastrService) => {
    expect(component).toBeTruthy();
  }));
});
