import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/Post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return '3';
        },
      },
    },
  };

  beforeEach( () => {
    mockPostService = jasmine.createSpyObj(['getPost','updatePost']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[FormsModule],
      providers:[
        {provide:Location, useValue: mockLocation},
        {provide:PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue:mockActivatedRoute}
      ]
    })

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    
  });

  it('should render the post title in h2 template',() => {
    mockPostService.getPost.and.returnValue(of({
      id:3,
      title:'title',
      body:'body'
    } as Post));
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement
    expect(element.textContent).toBe(component.post.title)
  })
 

 
});
