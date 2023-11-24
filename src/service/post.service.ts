import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private Http: HttpClient) { }
  userData() {
    return this.Http.get(`https://jsonplaceholder.typicode.com/posts`);
  }


  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';



  getAllArticles() {
    return this.Http.get(this.baseUrl);
  }

  getArticleById(articleId: number) {
    return this.Http.get(`${this.baseUrl}/${articleId}`);
  }

  createArticle(articleData: any) {
    return this.Http.post(this.baseUrl, articleData);
  }

  updateArticle(articleId: number, updatedArticleData: any) {
    return this.Http.put(`${this.baseUrl}/${articleId}`, updatedArticleData);
  }

  deleteArticle(articleId: number) {
    return this.Http.delete(`${this.baseUrl}/${articleId}`);
  }
}

