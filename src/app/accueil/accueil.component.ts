import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Component } from '@angular/core';
import { PostService } from 'src/service/post.service';
import { CommentServiceService } from '../service/comment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent {



  // Declaration
  public myData: any;
  public DataComment: any;
  public storeComment: any;
  public usersComment: any;
  public datacomment: any;
  public title: any = '';
  public body: any = '';
  public titre: any;
  public post: any;
  public idpost:any

  // Filtre js
  public _UserFilter = "";
  public filteredUser: any[] = [];
  // Getter et Setter
  public get userFilter(): any {
    return this._UserFilter;
  }

  public set userFilter(filter: string) {
    this._UserFilter = filter;
    this.filteredUser = this._UserFilter ? this.filterUsers(this.userFilter) : this.myData;
  }

  constructor(private http: HttpClient, private commentdata: CommentServiceService, private postService1: PostService) { }

  ngOnInit(): void {
    this.storeComment = localStorage.getItem('Post');
      if (this.storeComment) {
        this.usersComment = JSON.parse(this.storeComment);
      }else {
        localStorage.setItem('Post', JSON.stringify(this.storeComment));
      }
    this.afficher();
  }

   newArticle: any = {
    title: '',
    body: '',
    userId: 1
  };

  UpdatePost:any = {
    title: this.title,
    body:this.body,
  };

  private filterUsers(criteria: string): any[]{
    criteria = criteria.toLocaleLowerCase();
    const res = this.filteredUser.filter(
      (user: any) => user.title.toLocaleLowerCase().indexOf(criteria) !== -1
    );
    return res;
  }

  afficher() {
    this.postService1.userData().subscribe((data)=>{
      this.myData = data;
      this.filteredUser = this.myData
    });

    this.commentdata.PostData().subscribe((res) => {
      this.DataComment = res;
    })
  }

  addNewArticle() {
    this.postService1.createArticle(this.newArticle).subscribe(
      (response) => {
        console.log('Article ajouté avec succès :', response);
        // Réinitialiser les données pour ajouter un nouvel article
        this.newArticle = response;
        this.DataComment.push(this.newArticle);
        this.affichermessage('success','Article Ajouté','')
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'article :', error);
      }
    );
  }

  RecuperationId(id: any) {
    // @ts-ignore
    let userFound = this.DataComment.find(usersdata => usersdata.id === id);
    if (userFound) {
      this.titre = userFound.title;
      this.post = userFound.body;
    }
    this.idpost = id;
    return id;
  }


  ModifierPost(idpost: any) {
    this.postService1.updateArticle(idpost, this.UpdatePost).subscribe((response) => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `https://jsonplaceholder.typicode.com/posts/${idpost}`;
    this.http.patch(url, this.UpdatePost, { headers })
      .subscribe(
        (response: any) => {
          console.log('Utilisateur modifié :', response);
          // @ts-ignore
          let userFound = this.DataComment.find(usersdata => usersdata.id === idpost);
          if (userFound) {
            userFound.title = this.UpdatePost.title;
            userFound.body = this.UpdatePost.body;
            this.affichermessage('success','Article Modifier ','')
          }
        },
        (error) => {
          console.error('Erreur lors de la modification :', error);
        }
      );
    })
  }

  isArchived: boolean = false;
  toggleArchive(id:any) {
    this.isArchived = !this.isArchived;
  }

  affichermessage(icone: any, message: string,user:string) {
    Swal.fire({
        position: 'center',
        icon: icone,
        title: message +"" +user,
        showConfirmButton: true,
        // timer: 1500
    })
  }
}
