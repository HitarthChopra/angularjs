import { Component} from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'search',
  templateUrl:'search.component.html',
  
})
export class SearchComponent  {

  searchResults:any[]=[];
  displayOutput:boolean=false;
  displayDetailInfo:boolean=false;
  detailInfo:any;
  dataSource:any;
  searchValue:any;

  constructor(private appService: AppService ){
  }

  ngOnInit(): void {
    this.getAllArticles();
  }

    //Fetch all articles
    getAllArticles() {
      this.appService.getAllArticles()
        .subscribe(
        data => this.assignData(data),
        error => error);
    }
    assignData(data: any) {
      this.dataSource = data;
    }

  searchChange(value:any){
    this.searchResults=[];
    this.displayDetailInfo=false;
    this.displayOutput=true;
    
        for(var i=0;i<this.dataSource.length;i++){
      if((this.dataSource[i].title.toLowerCase()).indexOf((value.toLowerCase())) >= 0 || (this.dataSource[i].highlights.toLowerCase()).indexOf((value.toLowerCase())) >= 0 || (this.dataSource[i].detail.toLowerCase()).indexOf((value.toLowerCase())) >= 0){
        this.searchResults.push(this.dataSource[i]);
      }
      for(var j=0;j<this.dataSource[i].tags.length;j++)
      {
        if((this.dataSource[i].tags[j].toLowerCase()).indexOf((value.toLowerCase())) >= 0 && this.searchResults.indexOf(this.dataSource[i])<0){
this.searchResults.push(this.dataSource[i]);
        }
      }
    }
    

  }

  displayDetails(data:any){
      this.displayDetailInfo=true;
      this.detailInfo=data;
    }

}
