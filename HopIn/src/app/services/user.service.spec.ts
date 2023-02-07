import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

describe('UserService', () => {
    let userService: UserService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserService],
      });
  
      userService = TestBed.get(UserService);
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should send a correct post request to register passenger', () => {
      const passenger = {
        name: "Mika",
        surname: "Mikic",
        profilePicture: '',
        email: "mika@gmail.com",
        telephoneNumber: "0628090111",
        password: "123",
        address: "Neka Adresa"
      };
      const res = {
        id: 1,
        name: "Mika",
        surname: "Mikic",
        profilePicture: '',
        email: "mika@gmail.com",
        telephoneNumber: "0628090111",
        password: "123",
        address: "123", 
        blocked: false,
        newPassword: ''
      };
  
      userService.registerPassenger(passenger).subscribe(response => {
        expect(response).toEqual(res);
      });
  
      const req = httpMock.expectOne(environment.apiHost + "/passenger");
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(passenger);

      req.flush(res);
      httpMock.verify();
    });

    it('should return error when response has error register passenger', () => {
        const passenger = {
            name: "Mika",
            surname: "Mikic",
            profilePicture: '',
            email: "mikagmail.com",
            telephoneNumber: "0628090111",
            password: "123",
            address: "Neka Adresa"
        };

        let expectedError = {
            status: 400,
            statusText: 'Bad Request'
        }; 

        let error: any;
        userService.registerPassenger(passenger).subscribe(
            (response) => {},
            (err) => { error = err;}
        );
        
        const req = httpMock.expectOne(environment.apiHost + "/passenger");
        
        req.flush(expectedError, { status: 400, statusText: 'Bad Request' }); 
        expect(error.status).toEqual(expectedError.status);
        expect(error.statusText).toEqual(expectedError.statusText);
    });
});