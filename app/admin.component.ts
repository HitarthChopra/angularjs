import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

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
  constructor(private appService: AppService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }

  searchData() {

    if(this.value){
      this.error = false;
      for(var i=0;i<this.allArticles.length;i++){
        if(this.value.toLowerCase()==this.allArticles[i].title.toLowerCase()){
          this.tag=this.allArticles[i].tags;
          this.details=this.allArticles[i].detail;
          this.id = this.allArticles[i].id;
          break;
        }
      }
    } else {
      this.error = true;
      this.errorMsg = "Enter Search Value to search data."
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

      this.appService.deleteArticleById(this.id)
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
      this.appService.createArticle(data)
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
          this.appService.updateArticle(data)
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
    this.appService.getAllArticles()
      .subscribe(
      data => this.assignData(data),
      error => error);
  }
  assignData(data: any) {
    this.allArticles = data;
  }

}






