import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about3',
  templateUrl: './about3.component.html',
  styleUrls: ['./about3.component.css'],
})
export class About3Component {
  new_email!: string;

  constructor(private http: HttpClient,private authService: AuthService) { }

  updateEmail() {
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `http://127.0.0.1:8000/books/update_email/${userId}/`;
    const body = { new_email: this.new_email };

    this.http.post(url, body).subscribe(
      response => {
        console.log('Email updated successfully', response);
      },
      error => {
        console.error('Error updating email:', error);
      }
    );
  }
}
