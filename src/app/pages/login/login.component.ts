import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            alert(res.message);

            // Save user info in localStorage
            localStorage.setItem('user', JSON.stringify(res.user));

            // Redirect based on role
            if (res.user.user_type === 'admin') {
              this.router.navigate(['/admin']);
            } else if (res.user.user_type === 'recruiter') {
              this.router.navigate(['/recruiter']);
            } else {
              this.router.navigate(['/jobs']);
            }
          } else {
            alert(res.error);
          }
        },
        error: (err) => {
          console.error(err);
          alert('Login failed. Please try again.');
        }
      });
  }
}
