import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface User{
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userslist: User[] = [];
  u: User[] = [];
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this.http.get<any>("http://127.0.0.1:8000/books/users-list/").subscribe(
      (data) => {
        this.userslist = data.users;
      },
      (error) => {
        alert("error...");
      }
    )
  }

  newUser: User = { id: 0, username: '', password: '', email: '', created_at: '' }; // Initialize newUser object
  signup() {
    this.http.post<any>("http://127.0.0.1:8000/books/signup/", this.newUser).subscribe(
      (data) => {
        alert("ok");
        this.getUsers();
        this.router.navigate(['login']);
      },
      (error) => {
        alert("nope");
      }
    );
  }
}
