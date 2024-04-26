// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedInFlag: boolean = false; // Flag to track login status
//   userId: number | undefined;

//   constructor() {
//     // Check if login status is stored in local storage
//     const storedLoginStatus = localStorage.getItem('isLoggedIn');
//     if (storedLoginStatus) {
//       this.isLoggedInFlag = JSON.parse(storedLoginStatus);
//     }
//   }

//   login(userId: number) {
//     this.isLoggedInFlag = true;
//     this.userId = userId;
//     // Save login status to local storage
//     localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedInFlag));
//   }

//   logout() {
//     this.isLoggedInFlag = false;
//     this.userId = undefined;
//     // Remove login status from local storage
//     localStorage.removeItem('isLoggedIn');
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInFlag;
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag: boolean = false; // Flag to track login status
  userId: number | undefined ;

  constructor() { }

  login(userId: number) {
    this.isLoggedInFlag = true;
    this.userId = userId;
  }

  logout() {
    this.isLoggedInFlag = false;
    this.userId = undefined;
  }
  isLoggedIn(): boolean {
    // Return the current value of isLoggedInFlag
    return this.isLoggedInFlag;
  }
}