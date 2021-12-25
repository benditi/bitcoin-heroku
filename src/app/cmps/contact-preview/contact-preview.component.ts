import { AfterContentInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { ChangeFriend } from 'src/app/models/changeFriend.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact
  @Input() isFriend: boolean
  @Output() remove = new EventEmitter<string>()
  @Output() addFriend = new EventEmitter<ChangeFriend>()
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onRemoveContact(ev) {
    ev.stopPropagation()
    console.log(ev);
    this.remove.emit(this.contact._id)
  }
  onAddFriend(ev, status) {
    ev.stopPropagation();
    console.log(ev);
    this.addFriend.emit({ contactId: this.contact._id, status })
  }
  goToDetails(ev) {
    console.log(ev);
    this.router.navigateByUrl(`/contact/${this.contact._id}`);
  }
}
