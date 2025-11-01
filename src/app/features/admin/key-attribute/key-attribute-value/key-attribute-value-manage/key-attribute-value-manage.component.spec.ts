import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAttributeValueManageComponent } from './key-attribute-value-manage.component';

describe('KeyAttributeValueManageComponent', () => {
  let component: KeyAttributeValueManageComponent;
  let fixture: ComponentFixture<KeyAttributeValueManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyAttributeValueManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyAttributeValueManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
