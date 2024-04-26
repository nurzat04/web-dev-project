import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';

interface User{
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userslist: User[] = [];
  u: User[] = [];

  constructor(private http: HttpClient, private router: Router,private authService: AuthService,){ }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this.http.get<any>("http://127.0.0.1:8000/books/users-list/").subscribe(
      (data) => {
        this.userslist = data.users; 
        console.log(this.userslist);
      },
      (error) => {
        alert("error...");
      }
    )
  }

  login(username: string, password: string) {
    const user = this.userslist.find(u => u.username === username);
    if (user) {
      if (user.password === password) {
        alert("Login successful!");
        this.authService.login(user.id);
        this.router.navigate(['/']);
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      alert("User not found. Please sign up.");
    }
  }
}
