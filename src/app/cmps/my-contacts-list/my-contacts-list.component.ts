import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'my-contacts-list',
  templateUrl: './my-contacts-list.component.html',
  styleUrls: ['./my-contacts-list.component.scss']
})
export class MyContactsListComponent implements OnInit {
  @Input() myContacts: Contact[]  
  constructor() { }

  ngOnInit(): void {
  }

}
