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
import { Store } from '@ngrx/store';
import { addCustomVideo } from 'app/redux/actions/customVideo.action';
import { AppState } from 'app/redux/reducers/app.reducer';
import { Item } from 'app/youtube/models/search-result-item.model';
import { UtilsService } from 'app/youtube/services/utils.service';
import { KeyValuePipe } from '@angular/common';

enum ControlNames {
  title = 'title',
  description = 'description',
  imageLink = 'imageLink',
  videoLink = 'videoLink',
  creationDate = 'creationDate',
}

@Component({
  selector: 'app-card-creation',
  imports: [FormsModule, ReactiveFormsModule, KeyValuePipe],
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss'],
  standalone: true,
  providers: [UtilsService],
})
export class CardCreationComponent implements OnInit {
  cardForm: FormGroup;

  controlName = ControlNames;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utils: UtilsService
  ) {
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
    control: AbstractControl
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

  isControlInvalid(controlName: ControlNames): boolean {
    const control = this.cardForm.get(controlName);
    if (control) return control.invalid && control.touched;
    return false;
  }

  isTagInvalid(index: number): boolean {
    const control = this.tags.at(index).get('tag');
    if (control) return control.invalid && control.touched;
    return false;
  }

  getErrorMessage(controlName: ControlNames): string {
    const errors = this.cardForm.get(controlName)?.errors;
    if (!errors) return '';
    if (errors['requared']) {
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
    return '';
  }

  getTagErrorMessage(index: number): string {
    const errors = this.tags.at(index).get('tag')?.errors;
    if (!errors) return '';
    if (errors['required']) {
      return 'Please fill up this tag';
    }
    return '';
  }

  onSubmit(): void {
    const customVideo: Item = {
      kind: 'youtube#searchResult',
      etag: 'rb5LI8L3acjhNvJrMWvkr-jS7Dk',
      id: this.utils.randomString(10),
      snippet: {
        publishedAt: this.cardForm.value.creationDate,
        channelId: 'UCIJ6Spc2ooTRcb0EKcAOejA',
        title: this.cardForm.value.title,
        description: this.cardForm.value.description,
        thumbnails: {
          default: {
            url: this.cardForm.value.imageLink,
            width: 120,
            height: 90,
          },
          medium: {
            url: this.cardForm.value.imageLink,
            width: 320,
            height: 180,
          },
          high: {
            url: this.cardForm.value.imageLink,
            width: 480,
            height: 360,
          },
          standard: undefined,
          maxres: {
            url: this.cardForm.value.imageLink,
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'Emil TRF',
        liveBroadcastContent: 'none',
        tags: [],
        categoryId: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: this.utils.randomNumber(5),
        likeCount: this.utils.randomNumber(5),
        dislikeCount: this.utils.randomNumber(5),
        favoriteCount: '',
        commentCount: this.utils.randomNumber(5),
      },
      type: 'custom'
    };
    if (this.cardForm.valid) {
      this.store.dispatch(addCustomVideo({ customVideo }));
      console.log(this.cardForm.value);
    }
  }
}
