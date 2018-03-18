import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

 showAddDogForm: boolean = false;
 dogObj: object;
 name: string;
 breed: string;
 id: number;

  constructor(public ds: DataService) { }
  	displayedColumns = ['id', 'name', 'breed'];
	dataSource = ELEMENT_DATA;
  
  ngOnInit() {}

  addDog(){
  	console.log('add dog button clicked')
  	this.showAddDogForm = true;
  }

  cancel(){
  	this.showAddDogForm = false;
  }

  submitDog(form: NgForm){
  	
  	this.dogObj = {
          'name': form.value.name,
          'breed': form.value.breed
      }

    // console.log(this.dogObj);
    // Send Values to Services which will send to serverside to submit to API.
     this.ds.addDog(this.dogObj).subscribe((response) => {
        // RESPONSE CODE HERE ======
        if(response['status'] === 'Success') {
            console.log('dog was added!!');
            // this.updateMsg = 'You have successfully updated your customer details. You should get a email to confirm';
         }
    });
  }
}

const ELEMENT_DATA: Element[] = [
  {id: 1, name: 'Max', breed: 'golden retriver'},
  {id: 2, name: 'Holly', breed: 'yorky'},
];

export interface Element {
  id: number;
  name: string;
  breed: string;
}
