import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

@Component({
  selector: 'app-help-service',
  templateUrl: './help-service.component.html',
  styleUrls: ['./help-service.component.css']
})
export class HelpServiceComponent implements OnInit {
  userslist: User[] = [];
  u: User[] = [];
  name!: string;
  password!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['username'];
    });
    this.getUsers();
  }

  getUsers() {
    this.http.get<any>("http://127.0.0.1:8000/books/users-list/").subscribe(
      (data) => {
        this.userslist = data.users;
      },
      (error) => {
        alert("error...");
      }
    );
  }
  findpassword(email: string){
    const user = this.userslist.find(u => u.username === this.name);
    if(user){
      if(user.email === email){
        alert("correct!");
        this.password = user.password;
      } else {
        alert("Incorrect. Please try again.");
      }
    } else {
      alert("User not found. Please sign up.");
    }
  }
}