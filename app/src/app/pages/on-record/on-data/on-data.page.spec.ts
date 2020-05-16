import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnDataPage } from './on-data.page';

describe('OnDataPage', () => {
  let component: OnDataPage;
  let fixture: ComponentFixture<OnDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
