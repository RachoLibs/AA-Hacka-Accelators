import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAggregatorComponent } from './account-aggregator.component';

describe('AccountAggregatorComponent', () => {
  let component: AccountAggregatorComponent;
  let fixture: ComponentFixture<AccountAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
