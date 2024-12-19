import { TestBed } from '@angular/core/testing';

import { OpenaiRecommendationService } from './openai-recommendation.service';

describe('OpenaiRecommendationService', () => {
  let service: OpenaiRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
