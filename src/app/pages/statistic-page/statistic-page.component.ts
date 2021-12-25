import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GraphData } from 'src/app/models/graphData.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  isGraphSwitched: boolean = true;
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Bitcoin Market price (USD)' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit() {
    this.switchData()
  }
  async switchData() {
    this.isGraphSwitched = !this.isGraphSwitched;
    if (this.isGraphSwitched) {
      const pricesAndDates: GraphData = await this.bitcoinService.getTransactions()
      this.lineChartData = [
        { data: pricesAndDates.coinVals, label: 'Bitcoin Confirmed Transactions (USD)' },
      ];
      this.lineChartLabels = pricesAndDates.timeVals
    } else {
      const pricesAndDates: GraphData = await this.bitcoinService.getCoinRate()
      this.lineChartData = [
        { data: pricesAndDates.coinVals, label: 'Bitcoin Market price (USD)' },
      ];
      this.lineChartLabels = pricesAndDates.timeVals
    }
  }

}
