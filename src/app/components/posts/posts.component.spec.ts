import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';
import { PostsComponent } from './posts.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post/post.component';

// class MockPostService {
//   getPosts() {}

//   deletePost(post: Post) {
//     return of(true);
//   }
// }

describe('Posts Component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture : ComponentFixture<PostsComponent>

  // @Component({
  //   selector:'app-post',
  //   template:'<div></div>'
  // })
  // class FakePostComponent {
  //   @Input() post!: Post;
  // }

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      declarations:[PostsComponent,PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  it('should create child post element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postElements = debugElement.queryAll(By.css('.post'))
    expect(postElements.length).toBe(POSTS.length);
  })

  it('should create exact same number of post component', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postElements = debugElement.queryAll(By.directive(PostComponent))
    expect(postElements.length).toBe(POSTS.length);
  });

  it('should check exact post is passing to child component', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postElementDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
    for(let i = 0; i< postElementDEs.length;i++) {
      const postElement = postElementDEs[i].componentInstance as PostComponent;
      expect(postElement.post.title).toEqual(POSTS[i].title);
    }
  })

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post in Posts', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});