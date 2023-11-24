import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {


  private baseUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private Http: HttpClient) {}

  getAllComments() {
    return this.Http.get(this.baseUrl);
  }

  getCommentsByArticleId(articleId: number) {
    return this.Http.get(`${this.baseUrl}?postId=${articleId}`);
  }
  
  CommentData() {
    return this.Http.get(`https://jsonplaceholder.typicode.com/comments`);
  }

  PostData() {
    return this.Http.get(`https://jsonplaceholder.typicode.com/posts`);
  }
}
