import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  business = 'business';
  entertainment = 'entertainment';
  health = 'health';
  science = 'science';
  sports = 'sports';
  technology = 'technology';
  
  newsData: any;
  check = false;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
  }


  loadNewsData() {
    this.newsService.getData().subscribe(
      (response) => {
        this.check = true;
        this.newsData = response.articles;
        // console.log('Success!', response);
        console.log('Success!', response.articles);
      },
      (error) => console.error('Error!', error)
    );
  }

  loadCustomNewsData(type: string) {
    this.newsService.getCustomData(type).subscribe(
      (response) => {
        this.check = true;
        this.newsData = response.articles;
        // console.log('Success!', response);
        console.log('Success!', response.articles);
      },
      (error) => console.error('Error!', error)
    );
  }

}
