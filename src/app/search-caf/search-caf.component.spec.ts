import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCafComponent } from './search-caf.component';

describe('SearchCafComponent', () => {
  let component: SearchCafComponent;
  let fixture: ComponentFixture<SearchCafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
