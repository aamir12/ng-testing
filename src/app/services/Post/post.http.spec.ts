import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing";
import { PostService } from "./post.service";
import { Post } from "src/app/models/Post";

describe('Posts Service with HttClientTestingModule', () => {
    let httpTestingController: HttpTestingController;
    let postService: PostService;
    let POSTS:Post[] = [
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
    }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:[PostService],
            imports:[HttpClientTestingModule]
        })

        postService = TestBed.inject(PostService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach((() => {
        //it make sure only one request will be made by using httpTestingController
        httpTestingController.verify();
    }));


    describe('getPosts()', () => {

      it('should call getPosts method return posts data', (done:DoneFn) => {
        postService.getPosts().subscribe(data => {
            expect(data).toEqual(POSTS);
            done();
        });
    
        const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/posts`);
        req.flush(POSTS);
        expect(req.request.method).toEqual('GET');
      })  
      
    })

    describe('getPost()', () => {

        it('should call getPost method return post data', (done:DoneFn) => {
          postService.getPost(1).subscribe(data => {
              expect(data).toEqual(POSTS[0]);
              done();
          });

          //httpTestingController.verify(); is used in afterEach take make sure only one http request will be call
          //postService.getPost(1).subscribe();
      
          const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/posts/1`);
          req.flush(POSTS[0]);
          expect(req.request.method).toEqual('GET');
        })  
        
      })
    
  
})
