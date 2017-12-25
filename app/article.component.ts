import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';
import { SearchDataService } from './search-data.service'
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

value:any;
id:any;
tag:any;
details:any;
error:boolean = false;
errorMsg:String = "";

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
        //this.backToCreateArticle();
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


  data: any[];
  searchResults: any[] = [];

  //Create form
  searchForm = new FormGroup({
    value: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required)
  });



  //Component properties
  allArticles: any[];
  articleIdToUpdate = null;
  processValidation = false;
  //Create form
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(private articleService: ArticleService,
    private searchDataService: SearchDataService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();

    this.data = this.searchDataService.data;
  }

  //Add data
  // addData() {
  //   if (this.searchForm.invalid) {
  //     return; //Validation failed, exit from method.
  //   }
  //   //Form is valid, now perform create or update
  //   let search = this.searchForm.value;
  //   if (search.tag.includes("#")) {
  //     this.searchDataService.data.push({
  //       "title": search.value,
  //       "tags": search.tag,
  //       "highlights": "Angular is a platform that makes it easy to                                  build applications with the web.",
  //       "detail": search.details,
  //       "id": search.id
  //     });
  //   }
  // }

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

  //search
  // searchData(){
  //   console.log("value"+this.searchForm.value);
  //   //console.log("id"+this.searchForm.id);
  // }
  //Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      //Generate article id then create article
      this.articleService.getAllArticles()
        .subscribe(articles => {

          //Generate article id	 
          let maxIndex = articles.length - 1;
          let articleWithMaxIndex = articles[maxIndex];
          let articleId = articleWithMaxIndex.id + 1;
          article.id = articleId;

          //Create article
          this.articleService.createArticle(article)
            .subscribe(success => {
              this.getAllArticles();
              this.backToCreateArticle();
            },
            error => error
            );
        });
    } else {
      //Handle update article
      article.id = this.articleIdToUpdate;
      this.articleService.updateArticle(article)
        .subscribe(success => {
          this.getAllArticles();
          this.backToCreateArticle();
        },
        error => error);
    }
  }
  //Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.articleService.getArticleById(articleId)
      .subscribe(article => {
        this.articleIdToUpdate = article.id;
        this.articleForm.setValue({ title: article.title, category: article.category });
        this.processValidation = true;
      },
      error => error);
  }
  //Delete article
  // deleteArticle(articleId: string) {
  //   this.articleService.deleteArticleById(articleId)
  //     .subscribe(success => {
  //       this.getAllArticles();
  //       this.backToCreateArticle();
  //     },
  //     error => error);
  // }
  //Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }
}