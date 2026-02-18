import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ResponseLogin } from "../interfaces/response-login";


@Injectable({
  providedIn: 'root',
})
export class HttpAuth {

  private currentUser = new BehaviorSubject<null | Partial<User>>(null);
  private currentToken = new BehaviorSubject<null | string>(null);

  public currentUser$ = this.currentUser.asObservable();
  public currentToken$ = this.currentToken.asObservable();

  constructor(private http: HttpClient, private router: Router, ) {
    this.getLocalStorageData();
  }



  register(credentials: Partial<User>): Observable<Partial<User>> {
    return this.http.post<Partial<User>>('http://localhost:3000/api/v1/auth/register', credentials)
  }

   login( credentials: Partial<User> ): Observable<Partial<ResponseLogin>>  {
    return this.http.post<Partial<ResponseLogin>>('http://localhost:3000/api/v1/auth/login', credentials)
    .pipe(
      tap( (data) => {
        if (data.token && data.user) {

          this.currentUser.next(data.user);
          this.currentToken.next(data.token);
          this.saveLocalStorage(data.token, data.user);
          this.router.navigate(['/dashboard']);
        }
      })
    )
  }

  saveLocalStorage( token: string, userData: any ) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.currentUser.next(userData);
    this.currentToken.next(token);
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    this.currentToken.next(token ? token : null);

    const user = localStorage.getItem('user');
    this.currentUser.next(user ? JSON.parse(user) : null);
    return{
      token,
      user
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.currentToken.next(null);
  }

  checkAuthStatus() : Observable<boolean>{
    const {token} = this.getLocalStorageData();

    if (!token) {
      this.clearLocalStorage();
      return of(false);
    }

    const headers = new HttpHeaders().set( 'X-Token', token );

    return this.http.get<any>("http://localhost:3000/api/v1/auth/renew-token", { headers } ).pipe(
       map( (response) => {
        if (!response.token && !response.user) {
          return false;
        }

        this.saveLocalStorage(response.token, response.user);
        return true;
       }),
       catchError( (error) => {
        console.error('ERROR', error);
        return of (false);
       })
    );
  }
}
