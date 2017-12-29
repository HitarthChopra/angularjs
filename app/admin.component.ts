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
success: boolean = false;
successMsg: String = "";
  
  //Create constructor to get service instance
  constructor(private appService: AppService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }

 searchData() {

    if (this.value) {
      this.error = false;
      this.success = false;
      var dataFlag=false;
      for (var i = 0; i < this.allArticles.length; i++) {
        if (this.value.toLowerCase() == this.allArticles[i].title.toLowerCase()) {
          this.tag = this.allArticles[i].tags;
          this.details = this.allArticles[i].detail;
          this.id = this.allArticles[i].id;
          dataFlag = true;
          this.success = true;
          this.successMsg = "Data searched successfully.";
          this.error = false;
          break;
        }
      }
      if(!dataFlag){
        this.success = false;
        this.error = true;
        this.errorMsg = "No data found.";
        this.tag = "";
          this.details = "";
          this.id = "";
      }
    } else if(!this.value) {
      this.success = false;
      this.error = true;
      this.id = "";
      this.value = "";
      this.tag = "";
      this.details = "";
      this.errorMsg = "Enter Search Value to search data.";
    }
  }

  //Delete article
  deleteArticle() {

    var duplicateData = false;

    for (var i = 0; i < this.allArticles.length; i++) {
      if ((this.allArticles[i].title == this.value) || (this.allArticles[i].id == this.id)) {
        duplicateData = true;
        break;
      }
    }

    if (this.value && this.tag && this.details && this.id && duplicateData == true) {
      this.error = false;
      this.success = false;

      this.articleService.deleteArticleById(this.id)
        .subscribe(success => {
          this.getAllArticles();
          this.id = "";
          this.value = "";
          this.tag = "";
          this.details = "";
         this.error = false;
          this.success = true;
          this.successMsg = "Data deleted successfully.";
        },
        error => error);
    } else {
      this.success = false;
      this.error = true;
      this.errorMsg = "Only existing data can be deleted.";
    }

  }

  addData() {

    var duplicateData = false;

    for (var i = 0; i < this.allArticles.length; i++) {
      if ((this.allArticles[i].title == this.value)) {
        duplicateData = true;
        break;
      }
    }

    if (this.value && this.tag && this.details && duplicateData != true) {
      this.error = false;
      this.success = false;
      let data = {
        "title": this.value,
        "tags": this.tag.split(","),
        "highlights": "",
        "detail": this.details,
        "id": this.allArticles.length + 1
      };

      //Create data
      this.articleService.createArticle(data)
        .subscribe(success => {
          this.getAllArticles();
          this.value = "";
          this.tag = "";
          this.details = "";
          this.id = "";
         this.error = false;
          this.success = true;
          this.successMsg = "Data added successfully.";
        }, error => error);
    } else {
      this.success = false;
      this.error = true;
      this.errorMsg = "All fields are mandatory to add data. Search Value should be unique."
    }

  }
updateData() {

    var duplicateData = false;

    for (var i = 0; i < this.allArticles.length; i++) {
      if ((this.allArticles[i].title == this.value) || (this.allArticles[i].id == this.id)) {
        duplicateData = true;
        break;
      }
    }

    if (this.value && this.tag && this.details && this.id && duplicateData == true) {
      this.error = false;
      this.success = false;
      let data = {
        "title": this.value,
        "tags": this.tag,
        "highlights": "",
        "detail": this.details,
        "id": this.id
      };

      //Update data              
      this.articleService.updateArticle(data)
        .subscribe(success => {
          this.getAllArticles();
          this.value = "";
          this.tag = "";
          this.details = "";
          this.id = "";
         this.error = false;
          this.success = true;
          this.successMsg = "Data updated successfully.";
        }, error => error);
    } else {
      this.success = false;
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






