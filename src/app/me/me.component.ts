import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

interface User{
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  userId: number | undefined;
  user: User | null = null;
  new_password!: string;

  constructor(private http: HttpClient,private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.userId;
    if (this.userId) {
      this.getUser();
    } else {
      alert("User not logged in.");
    }
  }
  getUser(){
    this.http.get<User>("http://127.0.0.1:8000/books/users/" + this.userId + "/")
    .subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        alert("no");
      }     
    );
  }

}
