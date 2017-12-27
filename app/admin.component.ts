import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

value:any;
id:any;
tag:any;
details:any;
error:boolean = false;
errorMsg:String = "";
allArticles: any[];
  
  //Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }

  searchData() {

    if(this.value && this.id){
      this.error = false;
      for(var i=0;i<this.allArticles.length;i++){
        if(this.value==this.allArticles[i].title && this.id==this.allArticles[i].id){
          this.tag=this.allArticles[i].tags;
          this.details=this.allArticles[i].detail;
          break;
        }
      }
    } else {
      this.error = true;
      this.errorMsg = "Enter Search Value and Search ID to search data."
    }

  }

  //Delete article
  deleteArticle() {

    var duplicateData = false;

    for(var i=0;i<this.allArticles.length;i++){
      if((this.allArticles[i].title==this.value) || (this.allArticles[i].id==this.id)){
        duplicateData = true;
        break;
      }
    }

    if(this.value && this.tag && this.details && this.id && duplicateData==true){
      this.error = false;

      this.articleService.deleteArticleById(this.id)
      .subscribe(success => {
        this.getAllArticles();
        this.id="";
        this.value="";
        this.tag="";
        this.details="";
      },
      error => error);
    } else {
      this.error = true;
      this.errorMsg = "Only existing data can be deleted."
    }

  }

  addData() {

    var duplicateData = false;

    for(var i=0;i<this.allArticles.length;i++){
      if((this.allArticles[i].title==this.value) || (this.allArticles[i].id==this.id)){
        duplicateData = true;
        break;
      }
    }

    if(this.value && this.tag && this.details && this.id && duplicateData!=true){
      this.error = false;

      let data = {"title": this.value,
                  "tags": this.tag.split(","),
                  "highlights": "",
                  "detail": this.details,
                  "id": this.id};

      //Create data
      this.articleService.createArticle(data)
            .subscribe(success => {
              this.getAllArticles();
              this.value="";
              this.tag="";
              this.details="";
              this.id="";  
            }, error => error);
    } else{
      this.error = true;
      this.errorMsg = "All fields are mandatory to add data. Search Value and ID should be unique."
    }
      
  }

  updateData() {

    var duplicateData = false;

    for(var i=0;i<this.allArticles.length;i++){
      if((this.allArticles[i].title==this.value) || (this.allArticles[i].id==this.id)){
        duplicateData = true;
        break;
      }
    }
    
    if(this.value && this.tag && this.details && this.id && duplicateData==true){
      this.error = false;

      let data = {"title": this.value,
                  "tags": this.tag,
                  "highlights": "",
                  "detail": this.details,
                  "id": this.id};
          
          //Update data              
          this.articleService.updateArticle(data)
            .subscribe(success => {
              this.getAllArticles();
              this.value="";
              this.tag="";
              this.details="";
              this.id="";
            }, error => error);
    } else {
      this.error = true;
      this.errorMsg = "All fields are mandatory to update data. Only existing data can be updated."
    }

  }

  //Fetch all articles
  getAllArticles() {
    this.articleService.getAllArticles()
      .subscribe(
      data => this.test(data),
      error => error);
  }
  test(data: any) {
    this.allArticles = data;
  }

}






