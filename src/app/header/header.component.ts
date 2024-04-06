import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'To Do List Application';
  constructor(private readonly router: Router) {}

  onClickToDoListApp() {
    this.router.navigate(['/todolist']);
    this.title = 'To Do List Application';
  }

  onClickShoppingCartApp() {
    this.router.navigate(['/shoppingcart']);
    this.title = 'Shopping Cart Application';
  }
}
