import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookingService } from 'src/app/services/booking.service';
import {Stay} from '../../classes/stay'
import{Search} from '../../classes/search'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  airports = ['Calicut','Cochin','Kannur','Thiruvananthapuram'];
  isSearch=false;

  search:Search = {
     district:'',
     noOfDays:'',
     date:'',
     from:''
  }

  sortBy:string='';
  orderBy:string='';
  filterBy:string='';

  sort:string='';
  order:string='';
  filter:string='';

  // sorts:string[] = ['Distance','Rating','Price'];
  // orders:string[]= ['',''];
  // filters:string[]= ['Hotel','Homestay','Resort'];

  stays:Stay[]=[];
  p: number = 1;

  constructor(private _book:BookingService,private _router:Router) { }
  

  ngOnInit(): void {
  }

  // stay = new Stay('','','','','','','');
  // stay = new Stay('ABC Hotel','Ernakulam','4.5','XYZ Street,PIN:678900','1200','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUaaZiypzVM80STJasi4XdcR5MfFEDv0neg&usqp=CAU','1');
  
  
  //'ABC Hotel','Ernakulam','4.5','XYZ Street,PIN:678900','1200','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUaaZiypzVM80STJasi4XdcR5MfFEDv0neg&usqp=CAU','1'

  searchNow(){
    this.isSearch=true;
    if(this.search.district == ''){
      alert('Please select the Aiport!');
    }
    console.log('Searching..')
    console.log(this.search);
    this._book.searchStay(this.search)
    .subscribe( (res) =>
           {this.stays = JSON.parse(JSON.stringify(res));
            console.log(this.stays)},
                 (err) => {
                       console.log('Unknown Server Error!')
                 }
            )  
    }

  // resetNow(form:NgForm){
  //   console.log('Resetting..');
  //   form.reset();
  //   this.isSearch=false;
    
  // }

  viewStay(stay){
    localStorage.setItem('viewStayId',stay._id);
    // localStorage.setItem('viewStay',stay);
    this._router.navigate(['viewStay']);
  }

  sortFilter(){
    this.sortBy = this.sort;
    this.orderBy = this.order;
    this.filterBy = this.filter;
  }
}
