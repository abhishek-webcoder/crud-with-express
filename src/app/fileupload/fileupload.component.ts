import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _registrationService: RegistrationService
  ) {}

  form: FormGroup;
  error: string;

  ngOnInit() {
    this.form = this.formBuilder.group({
      image: [''],
      images: [''],
    });
  }

  // For single file upload onchange event
  
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('image').setValue(file);
    }
  }

  // For single file upload on submit

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.form.get('image').value);
  //   // console.log(formData);
  //   this._registrationService.upload(formData).subscribe(
  //     (res) => console.log('Success!', res),
  //     (err) => (this.error = err)
  //   );
  // }

  // For multiple file upload onchange event

  multipleImages = [];
  onFileChanges(event) {
    // if (event.target.files.length > 0) {
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     var files = event.target.files[i];
    //     console.log(files);
    //   }
    //   this.form.get('images').setValue(files);
    // }
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  // For multiple file upload on submit

  onSubmit() {
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }
    console.log(formData.getAll("files"));
    this._registrationService.uploads(formData).subscribe(
      (res) => console.log('Success!', res),
      (err) => (this.error = err.message)
    );
  }
}
