import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { signupService } from '../shared/signup.service';
import { Signup } from '../shared/signup.model';

declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [signupService]
})
export class SignupComponent implements OnInit {
  constructor(public signupservice: signupService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshSignupList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.signupservice.selectedsignup = {
      _id: "",
      name: "",
      username: "",
      email: "",
      password: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.signupservice.postSignup(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSignupList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.signupservice.putSignup(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSignupList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshSignupList() {
    this.signupservice.getSignupList().subscribe((res) => {
      this.signupservice.signup = res as Signup[];
    });
  }

  onEdit(sig: Signup) {
    this.signupservice.selectedsignup = sig;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.signupservice.deleteSignup(_id).subscribe((res) => {
        this.refreshSignupList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}