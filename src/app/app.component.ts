import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vishwas'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
  constructor(
    private fb: FormBuilder,
    private _registrationService: RegistrationService
  ) {}

  id: any;

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            ForbiddenNameValidator(/password/),
          ],
        ],
        password: [''],
        confirmPassword: [''],
        email: [''],
        subscribe: [false],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: PasswordValidator }
    );

    this.registrationForm
      .get('subscribe')
      .valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value).subscribe(
      (response) => console.log('Success!', response),
      (error) => console.error('Error!', error)
    );
  }

  loadAllData() {
    this._registrationService.getData().subscribe(
      (response) => console.log('Success!', response),
      (error) => console.error('Error!', error)
    );
  }

  loadIndvData(receivedId: number) {
    this.id = { id: receivedId };
    this._registrationService.getIndivData(this.id).subscribe(
      (response) => {
        this.registrationForm.patchValue({
          userName: response[0].username,
          password: response[0].password,
          confirmPassword: response[0].password,
          email: response[0].email,
          subscribe: response[0].promo,
          address: {
            city: response[0].city,
            state: response[0].state,
            postalCode: response[0].pcode,
          },
        });
        console.log('Success!', response);
      },
      (error) => console.error('Error!', error)
    );
  }

  updateData(receivedId: number) {
    this._registrationService
      .updateData(this.registrationForm.value, receivedId)
      .subscribe(
        (response) => console.log('Success!', response),
        (error) => console.error('Error!', error)
      );
  }

  deleteData(receivedId: number) {
    this.id = { id: receivedId };
    this._registrationService.deleteData(this.id).subscribe(
      (response) => console.log('Success!', response),
      (error) => console.error('Error!', error)
    );
  }
}
