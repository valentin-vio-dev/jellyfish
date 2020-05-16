import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnSignalsPage } from './on-signals.page';

describe('OnSignalsPage', () => {
  let component: OnSignalsPage;
  let fixture: ComponentFixture<OnSignalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnSignalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnSignalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
