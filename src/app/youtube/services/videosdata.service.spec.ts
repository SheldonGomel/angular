import { TestBed } from '@angular/core/testing';

import { VideosdataService } from './videosdata.service';

describe('VideosdataService', () => {
  let service: VideosdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
