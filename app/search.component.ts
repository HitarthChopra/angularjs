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
    //make service call here
    console.log(value);
    this.searchResults=[];
    this.displayDetailInfo=false;
    this.displayOutput=true;
    //console.log(this.dataSource.length);
    for(var i=0;i<this.dataSource.length;i++){
      if((this.dataSource[i].title.toLowerCase()).indexOf((value.toLowerCase())) >= 0){
        //console.log(this.dataSource[i].title.indexOf(value));
        this.searchResults.push(this.dataSource[i]);
        
      }
    }
    

  }

  displayDetails(data:any){
      this.displayDetailInfo=true;
      this.detailInfo=data;
    }

}
