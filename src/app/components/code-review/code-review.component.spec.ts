import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CodeReviewComponent } from './code-review.component';
import { DevopsService } from '../../services/devops.service';
import { NotificationService } from '../../services/notification.service';

describe('CodeReviewComponent', () => {
  let component: CodeReviewComponent;
  let fixture: ComponentFixture<CodeReviewComponent>;
  let devopsServiceSpy: jasmine.SpyObj<DevopsService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const devopsSpy = jasmine.createSpyObj('DevopsService', ['getCodeReviews', 'updateReviewStatus']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [CodeReviewComponent],
      providers: [
        { provide: DevopsService, useValue: devopsSpy },
        { provide: NotificationService, useValue: notificationSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeReviewComponent);
    component = fixture.componentInstance;
    devopsServiceSpy = TestBed.inject(DevopsService) as jasmine.SpyObj<DevopsService>;
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

    devopsServiceSpy.getCodeReviews.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load code reviews on init', () => {
    component.ngOnInit();
    expect(devopsServiceSpy.getCodeReviews).toHaveBeenCalled();
  });

  it('should approve review', () => {
    const reviewId = '1';
    devopsServiceSpy.getCodeReviews.and.returnValue(of([]));
    
    component.approveReview(reviewId);
    
    expect(devopsServiceSpy.updateReviewStatus).toHaveBeenCalledWith(reviewId, 'approved');
    expect(notificationServiceSpy.showSuccess).toHaveBeenCalled();
  });
});