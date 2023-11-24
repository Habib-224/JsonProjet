import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserServiceService } from '../user-service.service';
import {Router, Route } from '@angular/router';
import { CommentServiceService } from '../service/comment-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myData: any;
  storedUsers: any;
  usersdata: any
  users: any

  storeComment: any;
  usersComment: any;
  datacomment: any;

  Users1: any[] = [];
  Posts: any[] = [];

  constructor(private route: Router, private userService: UserServiceService, private Postdata:CommentServiceService) {
  }

  ngOnInit(): void{
     this.storedUsers = localStorage.getItem('Users1');
       if (this.storedUsers) {
         this.usersdata = JSON.parse(this.storedUsers);
       } else {
         // Si aucune donnée n'est présente dans le local storage, initialisez-le avec vos données par défaut
         localStorage.setItem('Users1', JSON.stringify(this.Users1));
    }

    this.storeComment = localStorage.getItem('Post');
       if (this.storeComment) {
         this.usersComment = JSON.parse(this.storeComment);
       } else {
         // Si aucune donnée n'est présente dans le local storage, initialisez-le avec vos données par défaut
         localStorage.setItem('Post', JSON.stringify(this.storeComment));
     }
    this.afficher();
  }

  formData = {
    email: '',
    password:''
  }

  afficher() {
    this.userService.userData().subscribe((data) => {
      this.myData = data;
      this.users = this.myData;
      localStorage.setItem('Users1', JSON.stringify(this.users));
    });
     this.Postdata.PostData().subscribe((data) => {
       this.datacomment = data;
       this.Posts = this.datacomment
      localStorage.setItem('Post', JSON.stringify(this.Posts));
    });
  }


  submitFunction(event: Event):void {
    event.preventDefault();
    if (this.formData.email != "" && this.formData.password == "passer") {
      let email = this.formData.email;
      let password = this.formData.password;
      // @ts-ignore
      let userFound = this.myData.find(usersdata => usersdata.email === this.formData.email);
      if (userFound) {
        // console.log("le user a ete trouve")
        this.affichermessage('success', "bienvenu", '')
        this.route.navigate(['/accueil/',userFound.id]);
      }else {
        console.log("user pas trouver")
      }
    } else {
      this.affichermessage('error','Email ou password incorrect','')
    }
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
