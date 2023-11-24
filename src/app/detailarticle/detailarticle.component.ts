import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentServiceService } from '../service/comment-service.service';
@Component({
  selector: 'app-detailarticle',
  templateUrl: './detailarticle.component.html',
  styleUrls: ['./detailarticle.component.css']
})
export class DetailarticleComponent implements OnInit {
  detailId: any;
  mydatacomment:any

  constructor(private route: ActivatedRoute, private commentService:CommentServiceService) { }

  ngOnInit() {
    // Utilisation du snapshot pour récupérer l'ID depuis l'URL
    this.detailId = this.route.snapshot.paramMap.get('id');
    // console.log(this.productId); // C'est l'ID récupéré depuis l'URL
    this.afficher()
  }


  comment:any[]=[]
  afficher() {
    this.commentService.CommentData().subscribe((res) => {
      this.mydatacomment = res
      for (let i = 0; i < this.mydatacomment.length; i++){
        if (this.mydatacomment[i].postId == this.detailId) {
           this.comment.push(this.mydatacomment[i])
         }
      }
  })
  }

}
