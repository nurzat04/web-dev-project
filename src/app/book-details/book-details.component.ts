import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Book{
showRate: any;
  id: number;
  title: string;
  author: string;
  published_date: string;
  description: string;
  price: number;
  quantity: number;
  category: string; 
  image:string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent  implements OnInit{
  book: Book | null = null;
  // rates: Rate | null = null;
  rates: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() : void{
    this.getBookDetails();  
  }

  getBookDetails(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    if(bookId){
      this.http.get<Book>("http://127.0.0.1:8000/books/book/" + bookId + "/")
      .subscribe(
        (data) => {
          this.book = data;
          this.getBookRatings();
        },
        (error) => {
          alert("no");
        }
      );
    }
  }
  toggleRateVisibility(item: any) {
    item.showRate = !item.showRate; // Toggle showRate for the clicked item
  }

  getBookRatings(){
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>("http://127.0.0.1:8000/books/get_rate/" + bookId + "/")
      .subscribe(
        (data) => {
          this.rates = data;
        }
      );
  }


}

