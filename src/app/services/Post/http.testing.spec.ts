import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from "@angular/common/http";

let testUrl = '/data';
interface Data {
    name:string;
}
describe('http client testing module', () => {
    let httpClient: HttpClient;
    let httpTestingController : HttpTestingController
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule]
        })

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });


    it('should call test url with get request',(done:DoneFn) => {
        let data = {
            name: 'aamir'
        }

        httpClient.get<Data>(testUrl).subscribe(responseData => {
            expect(responseData).toEqual(data)
            done();
        });
        const req = httpTestingController.expectOne(testUrl);
        //set responseData
        req.flush({name:'aamir'});
        expect(req.request.method).toEqual('GET');
    });

    

    it('should call multiple http request',() => {
        const testData: Data[] = [{ name: 'aamir' }, { name: 'khan' }, { name: 'ubes' }];

        httpClient.get<Data[]>(testUrl).subscribe((data) => {
            expect(data.length).toEqual(0);
        });
        
        httpClient.get<Data[]>(testUrl).subscribe((data) => {
        expect(data).toEqual([testData[0]]);
        });
    
        httpClient.get<Data[]>(testUrl).subscribe((data) => {
        expect(data).toEqual(testData);
        });

        const reqs = httpTestingController.match(testUrl);
        expect(reqs.length).toEqual(3);
        reqs[0].flush([]);
        reqs[1].flush([testData[0]]);
        reqs[2].flush(testData);
    });

})