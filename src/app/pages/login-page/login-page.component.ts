import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginPageComponent {
  email = 'eu';
  password = 'eu';

  constructor(private router: Router) { }

  onLogin() {
    console.log('Sign in button clicked', this.email);
    if (this.email && this.password) {
      console.log('Logging in...', this.email);
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 500);
    }
  }

}
