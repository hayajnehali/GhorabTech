import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryZoneComponent } from './manage-delivery-zone.component';

describe('ManageDeliveryZoneComponent', () => {
  let component: ManageDeliveryZoneComponent;
  let fixture: ComponentFixture<ManageDeliveryZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDeliveryZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDeliveryZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
