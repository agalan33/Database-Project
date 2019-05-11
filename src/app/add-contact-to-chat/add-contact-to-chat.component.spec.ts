import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactToChatComponent } from './add-contact-to-chat.component';

describe('AddContactToChatComponent', () => {
  let component: AddContactToChatComponent;
  let fixture: ComponentFixture<AddContactToChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactToChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
