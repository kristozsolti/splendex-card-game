import { TestBed } from '@angular/core/testing';

import { DeckSizeService } from './deck-size.service';

describe('DeckSizeService', () => {
  let service: DeckSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
