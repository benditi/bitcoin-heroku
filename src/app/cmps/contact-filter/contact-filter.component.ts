import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/filterBy.model';
import {ContactService} from '../../services/contact.service'

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit, OnDestroy {
  filterBy!: Filter
  subscription!: Subscription
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.filterBy$.subscribe((filterBy:{term:string})=>{
      this.filterBy = filterBy})
  }
  onSetFilter() {
    this.contactService.setFilter({...this.filterBy})
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
