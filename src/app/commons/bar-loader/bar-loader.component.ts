import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-loader',
  template: `
  <div class="loading">
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
  </div>
  `,
  styles: [
    `
    .loading {
      display: flex;
      align-items: center;
      margin-top: 40px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      background-color: white;
    }
    .loading-bar {
      display: inline-block;
      width: 4px;
      height: 18px;
      border-radius: 4px;
      margin-left: 4px;
      animation: loading 1s ease-in-out infinite;
    }
    .loading-bar:nth-child(1) {
      background-color: #3F1CCA;
      animation-delay: 0;
    }
    .loading-bar:nth-child(2) {
      background-color: #3F1CCA;
      animation-delay: 0.09s;
    }
    .loading-bar:nth-child(3) {
      background-color: #3F1CCA;
      animation-delay: .18s;
    }
    .loading-bar:nth-child(4) {
      background-color: #3F1CCA;
      animation-delay: .27s;
    }
    
    @keyframes loading {
      0% {
        transform: scale(1);
      }
      20% {
        transform: scale(1.2, 2.2);
      }
      40% {
        transform: scale(1);
      }
    }
    `
  ]
})
export class BarLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
