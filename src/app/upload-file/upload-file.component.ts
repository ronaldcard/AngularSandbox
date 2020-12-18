import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/upload';
  uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  private static errorResponseHandler(error): void {
    console.log(error);
  }

  private static successResponseHandler(response): void {
    console.log(response);
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({ selectedFile: [] } );
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; // TODO -> only one file?
      this.uploadForm.get('selectedFile').setValue(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('selectedFile').value);

    this.httpClient
      .post<any>(
        this.serverUrl,
        formData,
        { responseType: 'text' as 'json' })
      .subscribe(
        (response) => UploadFileComponent.successResponseHandler(response),
        (error) => UploadFileComponent.errorResponseHandler(error)
      );
  }
}
