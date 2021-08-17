import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculatorpage-cmp',
  templateUrl: 'calculatorpage.component.html'
})

export class CalculatorPageComponent implements OnInit {
  menuexpectedrole: string;
  calculatorModal: boolean;
  calculatorModal1: boolean;

  num1: number = 52;
  num2: number = 80;
  num3: number = 52;
  num4: number = 80;
  ngOnInit() {

    this.menuexpectedrole = localStorage.getItem('role');


  }
  showCalculator() {
    this.calculatorModal = true;
  }
  showCalculator1() {
    this.calculatorModal1 = true;
  }
  ConvertToInt(val) {
    return parseFloat(val);
  }
}
