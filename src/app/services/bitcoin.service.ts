import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import storageService from './storage.service';
import { Transactions } from '../models/transactions.modet';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private http: HttpClient) { }
    COINDB = 'coinDb';
    async getCoinRate() {
        let rate: any = [];
        if (storageService.loadFromStorage(this.COINDB)) {
            rate = storageService.loadFromStorage(this.COINDB)
        } else {
            rate = await this.http.get<number>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true').pipe().toPromise()
            storageService.saveToStorage(this.COINDB, rate)
        }
        const res = this.getSeperateValues(rate.values)
        return res
    }

    async getTransactions(){
        const transactions:any = await this.http.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true').pipe().toPromise()
        console.log('Transactions', transactions);
        const res = this.getSeperateValues(transactions.values)
        return res;
    }

    getSeperateValues(allVals){
        const timeVals: string[] = [];
        allVals.forEach((element: any) => timeVals.push(this.convertToDate(element.x)));
        const coinVals: number[] = [];
        allVals.forEach((element: any) => coinVals.push(element.y));
        const todaysVal:number = allVals[allVals.length - 1].y;
        return { timeVals, coinVals, todaysVal }
    }

    convertToDate(timestamp) {
        let date = new Date(timestamp*1000);
        var formatedDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
        return formatedDate;
    }



}