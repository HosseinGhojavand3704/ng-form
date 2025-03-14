import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthLayoutComponent } from './oauth-layout.component';

describe('MainLayoutComponent', () => {
  let component: OAuthLayoutComponent;
  let fixture: ComponentFixture<OAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuthLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
