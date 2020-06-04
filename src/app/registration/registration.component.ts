import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from '../shared/user-name.validator';
import { PasswordValidator } from '../shared/password.validator';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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
    private _registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  id: any;
  rcv_id: any;
  edit_id: number;
  if_edit: string;
  if_delete: string;
  sh_button = false;
  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        this.rcv_id = atob(atob(atob(params['id'])));
        this.edit_id = Number(this.rcv_id);
        this.if_edit = params['edit'];
        this.if_delete = params['delete'];

        if (this.if_edit == 'e') {
          console.log(this.edit_id);
          if (this.edit_id >= 0) {
            this.sh_button = true;
            this.loadIndvData(this.edit_id);
          }
        }

        if (this.if_delete == 'd') {
          console.log(this.edit_id);
          if (this.edit_id >= 0) {
            this.deleteData(this.edit_id);
          }
        }
        
      }
    );

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
        updateid: [''],
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
      (response) => {
        console.log('Success!', response);
        this.router.navigate(['/']);
      },
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
    console.log(this.id);
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
          updateid: response[0].id,
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
        (response) => {
          console.log('Success!', response);
          this.router.navigate(['userlist']);
        },
        (error) => console.error('Error!', error)
      );
  }

  deleteData(receivedId: number) {
    this.id = { id: receivedId };
    this._registrationService.deleteData(this.id).subscribe(
      (response) => {
        console.log('Success!', response);
        this.router.navigate(['userlist']);
      },
      (error) => console.error('Error!', error)
    );
  }

}
