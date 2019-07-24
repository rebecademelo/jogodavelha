import { TestBed } from '@angular/core/testing';

import { JogoService } from './jogo.service';
import { HttpModule } from '@angular/http';

describe('JogoService', () => {
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ JogoService ]
    });
  });

  it('should be created', () => {
    const service: JogoService = TestBed.get(JogoService);
    expect(service).toBeTruthy();
  });
});
