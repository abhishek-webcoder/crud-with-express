import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userData: any;
  check = false;
  constructor(private _registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  loadAllData() {
    this._registrationService.getData().subscribe(
      (response) => {
        this.check = true;
        this.userData = response;
        // console.log('Success!', response)
      },
      (error) => console.error('Error!', error)
    );
  }

  edit = 'e';
  editData(id: number) {
    // this.router.navigate(['registration']);
    console.log(id);
    this.router.navigate(['edit', btoa(btoa(btoa(id.toString(2)))), this.edit]);
  }

  delete = 'd';
  deleteData(id: number) {
    // this.router.navigate(['registration']);
    console.log(id);
    this.router.navigate(['delete', +id, this.delete]);
  }

}
