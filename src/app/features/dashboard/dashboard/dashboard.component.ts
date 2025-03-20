import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";
declare var $: any;
declare var owl: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalBalance: number = 25000;
  balanceTrend: number = 12.5;
  monthlyIncome: number = 5000;
  incomeTrend: number = 8.3;
  monthlyExpenses: number = 3500;
  expenseTrend: number = 5.2;
  savingsRate: number = 30;

  expensePieChart: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: string[];
  } = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: "pie",
      height: 350
    },
    labels: ["Housing", "Food", "Transportation", "Utilities", "Entertainment"],
    colors: ["#4361ee", "#3bc9db", "#fcc419", "#fa5252", "#be4bdb"]
  };

  trendChart: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    colors: string[];
  } = {
    series: [
      {
        name: "Income",
        data: [4400, 5500, 4100, 5000, 4800, 5000]
      },
      {
        name: "Expenses",
        data: [3200, 3500, 3100, 3500, 3800, 3500]
      }
    ],
    chart: {
      type: "line",
      height: 350
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    },
    colors: ["#4361ee", "#fa5252"]
  };

  budgetProgress = [
    { name: "Housing", current: 1200, total: 1500 },
    { name: "Food", current: 450, total: 500 },
    { name: "Transportation", current: 200, total: 300 },
    { name: "Utilities", current: 180, total: 200 },
    { name: "Entertainment", current: 150, total: 150 }
  ];

  groupExpenses = [
    {
      name: "Vacation Fund",
      members: 5,
      amount: 1200,
      image: "https://images.unsplash.com/photo-1503457574462-bd27054394c1"
    },
    {
      name: "House Expenses",
      members: 3,
      amount: 800,
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09"
    },
    {
      name: "Party Planning",
      members: 8,
      amount: 450,
      image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d"
    }
  ];

  groupMessages = [
    {
      userName: "John Doe",
      userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      text: "I've updated the expense sheet for this month",
      time: "10:30 AM",
      isOwn: true
    },
    {
      userName: "Jane Smith",
      userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: "Great, I'll review it later today",
      time: "10:35 AM",
      isOwn: false
    },
    {
      userName: "Mike Johnson",
      userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      text: "Don't forget to add the utility bills",
      time: "10:40 AM",
      isOwn: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 1500,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }

  openTransactionModal(): void {
    console.log("Opening transaction modal");
  }

  openBudgetModal(): void {
    console.log("Opening budget modal");
  }

  generateReport(): void {
    console.log("Generating report");
  }
}