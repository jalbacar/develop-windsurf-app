import { TestBed } from '@angular/core/testing';
import { DevopsService } from './devops.service';

describe('DevopsService', () => {
  let service: DevopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return commits', (done) => {
    service.getCommits().subscribe(commits => {
      expect(commits).toBeDefined();
      expect(commits.length).toBeGreaterThan(0);
      expect(commits[0].id).toBeDefined();
      expect(commits[0].author).toBeDefined();
      expect(commits[0].message).toBeDefined();
      done();
    });
  });

  it('should return team members', (done) => {
    service.getTeamMembers().subscribe(members => {
      expect(members).toBeDefined();
      expect(members.length).toBeGreaterThan(0);
      expect(members[0].name).toBeDefined();
      expect(members[0].role).toBeDefined();
      done();
    });
  });

  it('should return code reviews', (done) => {
    service.getCodeReviews().subscribe(reviews => {
      expect(reviews).toBeDefined();
      expect(reviews.length).toBeGreaterThan(0);
      expect(reviews[0].title).toBeDefined();
      expect(reviews[0].status).toBeDefined();
      done();
    });
  });
});