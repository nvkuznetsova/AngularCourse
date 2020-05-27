import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader', () => {
    service.loaderState.subscribe(state => {
      expect(state).toBeTruthy();
    });

    service.show();
  });

  it('should show loader', () => {
    service.loaderState.subscribe(state => {
      expect(state).toBeFalsy();
    });

    service.hide();
  });
});
