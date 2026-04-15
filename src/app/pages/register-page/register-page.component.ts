import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterPageComponent {
  username = 'lari';
  email = 'eu';
  password = 'eu';
  confirmPassword = 'eu';

  constructor(private router: Router, private authService: AuthService) { }

  onRegister() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user', error);
      }
    );
  }
}

