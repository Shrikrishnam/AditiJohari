import { Component, OnInit, AfterViewInit,ViewChildren,AfterViewChecked} from '@angular/core';
import { FormsModule,FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import {UserService} from 'src/app/_services/user.service';
import { numberLiteralTypeAnnotation } from '@babel/types';
 
export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  styleUrls:['./place-fitness-trainer-appointment.component.css'],
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit,AfterViewInit {
  
  fitnessForm:FormGroup;
  success:boolean=false;
  checkAge:boolean=false;
  checkPhone:boolean=false;
  @ViewChildren('input') vc;
  constructor(private fb:FormBuilder,private userService:UserService) { }
  
  ngOnInit() {
    this.fitnessForm=this.fb.group({
      firstname:['',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]],
      lastname:['',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]],
      email:['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      age:['',Validators.required],
      phonenumber:['',Validators.required],
      streetaddress:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
      pincode:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      packages:['',Validators.required],
    trainerpreference:['',Validators.required],
    inr:['',Validators.required],
    paisa:['',Validators.required]
  });
  } 
  ngAfterViewInit(){
    this.vc.first.nativeElement.focus();
  }

  onSubmit() {
    if(this.fitnessForm.valid)
    {
       this.addFitness(this.fitnessForm.value);
    }
    else
    {
      alert("Some fields are not written properply,please check!!");
      window.scrollTo(0,0);
      this.ngOnInit();
    }
  }
  addFitness(fitForm){
      this.userService.postfitnessdata(fitForm).subscribe((response)=>{
          this.success=true;
          console.log(response);
          
      });
  }
  checkAgeLimit(){
      if(this.fitnessForm.controls.age.value<19 || this.fitnessForm.controls.age.value>59)
      {
        this.checkAge =true;
      }
      else{
        this.checkAge= false;
      }
  }
  checkPhoneLimit(){
      let len:number;
      len=this.fitnessForm.controls.phonenumber.value.toString().length;
      if(len!=10)
      {
        this.checkPhone =true;

      }
      else
      {
         this.checkPhone =false;

      }
  }
}
