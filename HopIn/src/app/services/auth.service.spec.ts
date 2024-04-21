import { AuthService, TokenDTO } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Token, TokenType } from '@angular/compiler';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthService],
      });
  
      authService = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    it('should send a correct post request to login user', () => {
      const auth = { email: 'mika@gmail.com', password: '123' };
      const res: TokenDTO = {
        accessToken: new Token(1, 1, TokenType.String, 1, "accessToken"),
        refreshToken: new Token(1, 1, TokenType.String, 1, "refreshToken")
      }
  
      authService.login(auth).subscribe(response => {
        expect(response).toEqual(res);
      });
  
      const req = httpMock.expectOne(environment.apiHost + "/user/login");
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(auth);

      req.flush(res);
      httpMock.verify();
    });

    it('should return error when response has error login user', () => {
        const auth = { email: 'mikagmail.com', password: '123' };
        let expectedError = {
            status: 400,
            statusText: 'Bad Request'
        }; 

        let error: any;
        authService.login(auth).subscribe(
            (response) => {},
            (err) => { error = err;}
        );
        
        const req = httpMock.expectOne(environment.apiHost + "/user/login");
        
        req.flush(expectedError, { status: 400, statusText: 'Bad Request' }); 
        expect(error.status).toEqual(expectedError.status);
        expect(error.statusText).toEqual(expectedError.statusText);
    });


  });