import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmpassword: string = '';
  user_type: string = 'user';  // default to 'user'

  constructor(private auth: AuthService, private router: Router) { }

  register(): void {
    console.log('Inside registration function');

    // Basic validation
    if (!this.username || !this.password || !this.confirmpassword) {
      alert('All fields are required!');
      return;
    }

    if (this.password !== this.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call backend API
    this.auth.register({
      username: this.username,
      password: this.password,
      user_type: this.user_type
    }).subscribe({
      next: (res: any) => {
        if (res.status) {
          alert(res.message || 'Registration successful!');
          this.router.navigate(['/login']); // navigate to login page
        } else {
          alert(res.error || 'Registration failed.');
        }
      },
      error: (err: any) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
