import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about2',
  templateUrl: './about2.component.html',
  styleUrls: ['./about2.component.css'],
})
export class About2Component{
  new_username!: string;

  constructor(private http: HttpClient,private authService: AuthService) { }

  updateUsername() {
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `http://127.0.0.1:8000/books/update_name/${userId}/`;
    const body = { new_username: this.new_username };

    this.http.post(url, body).subscribe(
      response => {
        console.log('Username updated successfully', response);
      },
      error => {
        console.error('Error updating username:', error);
      }
    );
  }

}
