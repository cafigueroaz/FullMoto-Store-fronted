import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpUser } from '../../../core/services/http-user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public formData!: FormGroup;

  constructor(private httpUser: HttpUser) {
    this.formData = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
    });
  }

  onSubmit() {
    this.httpUser.createUser(this.formData.value).subscribe((response) => {
      console.log('Usuario creado', response);
    });
  }

  ngOnit(): void {}
}
