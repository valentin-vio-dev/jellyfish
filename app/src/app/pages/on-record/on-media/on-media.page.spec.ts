import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnMediaPage } from './on-media.page';

describe('OnMediaPage', () => {
  let component: OnMediaPage;
  let fixture: ComponentFixture<OnMediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnMediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
