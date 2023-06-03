import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { Post } from "src/app/models/Post";
import { first, of } from "rxjs";

describe('Post Service',() => {
    let httpClientSpy : jasmine.SpyObj<HttpClient>;
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

    beforeEach(()=> {
        httpClientSpy = jasmine.createSpyObj('HttpClient',['get']);
        postService = new PostService(httpClientSpy);
    })

    describe('getPosts',() => {
        it('should return expected post when get post is called',(done:DoneFn)=> {
            httpClientSpy.get.and.returnValue(of(POSTS));
            postService.getPosts().pipe(first()).subscribe({
                next: (posts) => {
                    expect(posts).toEqual(POSTS);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        })
    })
})