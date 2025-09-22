import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { DevopsService } from './services/devops.service';
import { NotificationService } from './services/notification.service';
import { of } from 'rxjs';

describe('App', () => {
  let devopsServiceSpy: jasmine.SpyObj<DevopsService>;

  beforeEach(async () => {
    const devopsSpy = jasmine.createSpyObj('DevopsService', ['getCommits', 'getTeamMembers', 'getCodeReviews']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showSuccess', 'showError', 'showInfo']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: DevopsService, useValue: devopsSpy },
        { provide: NotificationService, useValue: notificationSpy }
      ]
    }).compileComponents();

    devopsServiceSpy = TestBed.inject(DevopsService) as jasmine.SpyObj<DevopsService>;

    // Setup default return values
    devopsServiceSpy.getCommits.and.returnValue(of([]));
    devopsServiceSpy.getTeamMembers.and.returnValue(of([]));
    devopsServiceSpy.getCodeReviews.and.returnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the correct title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('DevOps Learning Platform');
  });

  it('should change active section', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    app.onSectionChange('commit-history');
    expect(app.activeSection).toBe('commit-history');
  });
});
