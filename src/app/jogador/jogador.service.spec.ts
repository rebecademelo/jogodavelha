import { TestBed } from '@angular/core/testing';

import { JogadorService } from './jogador.service';

describe('JogadorService', () => {

  beforeEach(() => { 
    TestBed.configureTestingModule({
      providers: [ JogadorService ]
    });
  });
  
  it('should be created', () => {
    const service: JogadorService = TestBed.get(JogadorService);
    expect(service).toBeTruthy();
  });
});
