import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TeamCollaborationComponent } from './team-collaboration.component';
import { DevopsService } from '../../services/devops.service';
import { NotificationService } from '../../services/notification.service';

describe('TeamCollaborationComponent', () => {
  let component: TeamCollaborationComponent;
  let fixture: ComponentFixture<TeamCollaborationComponent>;
  let devopsServiceSpy: jasmine.SpyObj<DevopsService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const devopsSpy = jasmine.createSpyObj('DevopsService', ['getTeamMembers', 'getCodeReviews']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showInfo']);

    await TestBed.configureTestingModule({
      imports: [TeamCollaborationComponent],
      providers: [
        { provide: DevopsService, useValue: devopsSpy },
        { provide: NotificationService, useValue: notificationSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamCollaborationComponent);
    component = fixture.componentInstance;
    devopsServiceSpy = TestBed.inject(DevopsService) as jasmine.SpyObj<DevopsService>;
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

    devopsServiceSpy.getTeamMembers.and.returnValue(of([]));
    devopsServiceSpy.getCodeReviews.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load team data on init', () => {
    component.ngOnInit();
    expect(devopsServiceSpy.getTeamMembers).toHaveBeenCalled();
    expect(devopsServiceSpy.getCodeReviews).toHaveBeenCalled();
  });

  it('should send message to team member', () => {
    const member = { id: '1', name: 'Test User', role: 'Developer' };
    component.sendMessage(member);
    expect(notificationServiceSpy.showInfo).toHaveBeenCalledWith('Mensaje enviado a Test User');
  });
});