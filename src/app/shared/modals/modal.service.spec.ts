import { TestBed, inject } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });
  });

  it('should be initialized', inject([ModalService], (modalService: ModalService) => {
    expect(modalService).toBeTruthy();
  }));
});
