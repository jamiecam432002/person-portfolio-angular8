import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  submitted: Boolean = false;

  contactForm: FormGroup;
  contactMessages: AngularFirestoreCollection;

  data = {
    name: 'Contact Jamie Cameron',
    bio: 'I am always looking to create new working relationships and open to new opportunities, particularly if they involve Angular. Feel free to contact me and lets chat!'
  }

  constructor(private title: Title, private meta: Meta, private db: AngularFirestore) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', [Validators.required])
    });
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/contact-me' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  onSubmit(form) {
    let formData = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message
    }
    console.log(formData);
    this.submitted = true;
    this.contactMessages = this.db.collection('contactMessages');
    this.contactMessages.add(formData);
  }

}
