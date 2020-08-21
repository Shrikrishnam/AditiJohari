import { Component, OnInit, ViewChildren,AfterViewInit } from '@angular/core';
import {UserService} from 'src/app/_services/user.service';
import { Router } from"@angular/router";


@Component({
  selector: 'app-view-appointment',
  styleUrls:['./view-appointment.component.css'],
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  success:boolean=false;
  allApp:Object;
  status:boolean=false;
  updateForm:Object={
    firstname:[''],
    lastname:[''],
    email:[''],
    age:[''],
    phonenumber:[''],
    streetaddress:[''],
    city:[''],
    state:[''],
    country:[''],
    pincode:[''],
    packages:[''],
    trainerpreference:['']
  };
 

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit() {
     this.getFitness();
  }

  
  getFitness() {
    this.userService.getfitnessdata().subscribe((response)=>{
          this.allApp=response
      });  
  }
  deleteFitness(data){
    if(window.confirm("Do you really want to delete ?"))
    {
      return this.userService.deleteFitnessData(data).subscribe(()=>{
          this.getFitness();
      });
    }
    else
    {}
  }
  editFitness(data)
  {
    this.updateForm=data;
    this.status=true;
    window.scrollTo(0,0);
  }
  cancelUpdate(){
    window.location.reload();
  }
  updateApp(){
    if(this.validateForm(this.updateForm))
    {
      this.status=false;
      alert("Data saved successfully");
      this.userService.putFitnessData(this.updateForm).subscribe((response)=>{
          this.success=true;
        console.log(response);
      });
    }
    else{
      this.status=true;
    }
  }
  validateForm(form){
    let regName=new RegExp('^[a-zA-Z]+$');
    let regEmail=new RegExp('[^ @]*@[^ @]*');
    if(form['firstname']==="" || form['lastname']==="" || form['email']==="" || form['streetaddress']==="" || form['state']==="" ||
     form['city']==="" || form['country']==="" || form['pincode']==="" || form['phonenumber']==="" || form['packages']==="" || form['trainerpreference'] ===""){
      alert("Please fill all form fields");
      return false;
    }
    else if(!regName.test(form['firstname'])){
      alert("Enter valid Firstname");
      return false;
    }
    else if(!regName.test(form['lastname'])){
      alert("Enter valid Lastname");
      return false;   
    }
    else if(!regEmail.test(form['email'])){
      alert("Enter valid Email");
      return false;    
    }
    else if(form['age']<19 || form['age']>59){
      alert("Age must be above 18 and below 60");
      return false;  
    }
    else if(form['phonenumber'].toString().length!=10){
      alert("Phone number should be of 10 digits");
      return false;  
    }
    else if(form['pincode'].toString().length!=6){
      alert("Pincode should be of 6 digits");
      return false;
    }
    else{
      return true;
    }
  }
}