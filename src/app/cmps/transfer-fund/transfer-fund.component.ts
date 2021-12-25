import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {
  @Input() contact:Contact
  @Output() transfer= new EventEmitter<number>()
  transferSum:number=0
  constructor() { }

  ngOnInit(): void {
  }
  onTransfer(){
    console.log('transferSum', this.transferSum);
    this.transfer.emit(this.transferSum)
  }

}
