import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User{
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  //user_id!: number;
  new_password!: string;
  userslist: User[] = [];
  u: User[] = [];

  constructor(private http: HttpClient) { }

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

  updatePassword(username: string, email: string, old_password: string) {
    const user = this.userslist.find(u => (u.username === username));
    if(user){
      if((user.email === email) && (user.password === old_password)){
        const url = `http://127.0.0.1:8000/books/update_password/${user.id}/`;
        const data = { new_password: this.new_password };
    
        this.http.post(url, data)
          .subscribe(
            response => {
              alert("ok");
            },
            error => {
              alert("nope");
            }
          );
      }else if(user.email !== email){
        alert("incorrect email...")
      }else{
        alert("incorrect currect password...")
      }
    }else{
      alert("User not found. Please sign up.")
    }
  }
}
