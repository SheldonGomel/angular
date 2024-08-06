import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-card-creation',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss'],
  standalone: true,
})
export class CardCreationComponent implements OnInit {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      imageLink: ['', [Validators.required]],
      videoLink: ['', [Validators.required]],
      creationDate: ['', [Validators.required, this.creationDateValidator]],
      tags: this.fb.array([this.createTag()]),
    });
  }

  ngOnInit(): void {}

  createTag(): FormGroup {
    return this.fb.group({
      tag: ['', Validators.required],
    });
  }

  get tags(): FormArray {
    return this.cardForm.get('tags') as FormArray;
  }

  addTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  creationDateValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const today = new Date();
    return date > today ? { invalidDate: true } : null;
  }

  resetForm(): void {
    this.cardForm.reset();
    while (this.tags.length !== 1) {
      this.tags.removeAt(0);
    }
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      console.log(this.cardForm.value);
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.cardForm.get(controlName);
    if (control) return control.invalid && control.touched;
    return false;
  }

  isTagInvalid(index: number): boolean {
    const control = this.tags.at(index).get('tag');
    if (control) return control.invalid && control.touched;
    return false;
  }

  getErrorMessage(controlName: string): string {
    const errors = this.cardForm.get(controlName)?.errors;
    if (errors) {
      if (errors['required']) {
        switch (controlName) {
          case 'title':
            return 'Please enter a title';
          case 'imageLink':
            return 'Please enter a link to the image';
          case 'videoLink':
            return 'Please enter a link to the video';
          case 'creationDate':
            return 'Please enter a creation date';
          default:
            return 'This field is required';
        }
      }
      if (errors['minlength']) {
        return `The ${controlName} is too short`;
      }

      if (errors['maxlength']) {
        return `The ${controlName} is too long`;
      }
      if (errors['invalidDate']) {
        return 'The date is invalid';
      }
    }
    return '';
  }

  getTagErrorMessage(index: number): string {
    const errors = this.tags.at(index).get('tag')?.errors;
    if (errors) {
      if (errors['required']) {
        return 'Please fill up this tag';
      }
    }
    return '';
  }
}
