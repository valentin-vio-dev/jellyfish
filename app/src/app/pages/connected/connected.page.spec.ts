import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConnectedPage } from './connected.page';

describe('ConnectedPage', () => {
  let component: ConnectedPage;
  let fixture: ComponentFixture<ConnectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
