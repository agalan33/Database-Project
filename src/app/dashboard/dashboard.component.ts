import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostsPerDay} from '../classes/PostsPerDay';
import {TrendingHash} from '../classes/TrendingHash';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
private postsperdayURL = 'http://127.0.0.1:5000/DbProject/messages/daily_count';
private repliesperdayURL = 'http://127.0.0.1:5000/DbProject/replies/daily_count';
private likesperdayURL = 'http://127.0.0.1:5000/DbProject/dailyLikes';
private dislikesperdayURL = 'http://127.0.0.1:5000/DbProject/dailyDislikes';
private trendingHashURL = 'http://127.0.0.1:5000/DbProject/hashtags/trending';

  title3 = 'Trending Hashtags';
  type3 = 'Table';
  trending = [];
  columnNames3 = ['Position', 'Hashtag', 'Times used'];




  title = 'Replies per day';
  repliesperday = [];
  columnNames = ['Date', 'Number of replies'];


  title4 = 'Likes per day';
  likesperday = [];
  columnNames4 = ['Date', 'Number of likes'];


  title5 = 'Disikes per day';
  dislikesperday = [];
  columnNames5 = ['Date', 'Number of dislikes'];

  title2 = 'Total posts per day';
  type2 = 'LineChart';
  postsperday = [];
  columnNames2 = ['Date', 'Number of posts'];
  options2 = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
  };
  width2 = 550;
  height2 = 400;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getTrendingHash();
    this.getPostsPerDay();
    this.getRepliesPerDay();
    this.getLikesPerDay();
    this.getDislikesPerDay();
  }
  getTrendingHash() {
    this.httpClient.get<TrendingHash[]>(this.trendingHashURL).subscribe((data: TrendingHash[]) => {
      data.forEach(elem => {
        this.trending.push([elem.position, elem.htext, elem.count]);
      });
    });
  }

  getPostsPerDay() {
    this.httpClient.get<PostsPerDay[]>(this.postsperdayURL).subscribe((data: PostsPerDay[]) => {
      data.forEach(elem => {
        this.postsperday.push([elem.date, elem.count]);
      });
    });
  }

  getRepliesPerDay() {
    this.httpClient.get<PostsPerDay[]>(this.repliesperdayURL).subscribe((data: PostsPerDay[]) => {
      data.forEach(elem => {
        this.repliesperday.push([elem.date, elem.count]);
      });
    });
  }

  getLikesPerDay() {
    this.httpClient.get<PostsPerDay[]>(this.likesperdayURL).subscribe((data: PostsPerDay[]) => {
      data.forEach(elem => {
        this.likesperday.push([elem.date, elem.count]);
      });
    });
  }


  getDislikesPerDay() {
    this.httpClient.get<PostsPerDay[]>(this.dislikesperdayURL).subscribe((data: PostsPerDay[]) => {
      data.forEach(elem => {
        this.dislikesperday.push([elem.date, elem.count]);
      });
    });
  }

}
