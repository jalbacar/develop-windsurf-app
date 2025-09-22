import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommitHistoryComponent } from './commit-history.component';
import { DevopsService } from '../../services/devops.service';
import { Commit } from '../../models';

describe('CommitHistoryComponent', () => {
  let component: CommitHistoryComponent;
  let fixture: ComponentFixture<CommitHistoryComponent>;
  let devopsServiceSpy: jasmine.SpyObj<DevopsService>;

  const mockCommits: Commit[] = [
    {
      id: '1',
      author: 'Test Author',
      message: 'Test commit',
      date: new Date(),
      files: ['src/test.ts']
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DevopsService', ['getCommits']);

    await TestBed.configureTestingModule({
      imports: [CommitHistoryComponent],
      providers: [
        { provide: DevopsService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitHistoryComponent);
    component = fixture.componentInstance;
    devopsServiceSpy = TestBed.inject(DevopsService) as jasmine.SpyObj<DevopsService>;

    devopsServiceSpy.getCommits.and.returnValue(of(mockCommits));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load commits on init', () => {
    component.ngOnInit();
    expect(devopsServiceSpy.getCommits).toHaveBeenCalled();
    expect(component.commits.length).toBe(1);
  });

  it('should extract file name from path', () => {
    const fileName = component.getFileName('src/app/test.component.ts');
    expect(fileName).toBe('test.component.ts');
  });
});