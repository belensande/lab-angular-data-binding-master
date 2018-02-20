import { Component, OnInit } from '@angular/core';
import foods from '../foods';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodList: any[];
  pattern: string;
  isAddFormHidden: boolean = true;
  newFood: any = {};
  totalCalories: number = 0;
  todayFood: any[] = [];
  quantityDefault: number = 1;

  constructor() { }

  ngOnInit() {
    this.foodList = foods;
  }

  toggleForm() {
    this.isAddFormHidden = !this.isAddFormHidden;
  }

  addFood() {
    this.newFood.quantity = 0;
    this.foodList.push(this.newFood);
    this.newFood = {};
    this.toggleForm();
  }

  addTodayFood(food: any) {
    food.quantity = food.quantity || 1;
    this.updateTotalCalories(food);
  }

  updateTotalCalories(food: any) {
    this.todayFood = this.todayFood.filter(tf => tf.name != food.name);
    if (food.quantity) {
      this.todayFood.push(food);
    }
    this.totalCalories = this.todayFood.reduce((total, tf) => {
      return total + tf.calories * tf.quantity;
    }, 0);
  }
}
