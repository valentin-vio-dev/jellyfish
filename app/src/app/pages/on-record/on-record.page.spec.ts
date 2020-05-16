import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnRecordPage } from './on-record.page';

describe('OnRecordPage', () => {
  let component: OnRecordPage;
  let fixture: ComponentFixture<OnRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
