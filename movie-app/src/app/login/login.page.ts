import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular'; // Import AlertController
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      await this.presentAlert('Please enter both email and password.');
      return;
    }

    // Validate email format
    if (!this.isValidEmail(this.email)) {
      await this.presentAlert('Please enter a valid email address.');
      return;
    }

    // Check if password length is valid
    if (this.password.length < 6) {
      await this.presentAlert('Password must be at least 6 characters.');
      return;
    }

    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('User logged in:', user);
      this.router.navigate(['/home']); // Navigate to home page after successful login
    } catch (error) {
      console.error('Error during login:', error);

      // Show specific error messages based on the error
      if ((error as any).code === 'auth/user-not-found') {
        await this.presentAlert('No user found with this email.');
      } else if ((error as any).code === 'auth/wrong-password') {
        await this.presentAlert('Incorrect password.');
      } else if ((error as any).code === 'auth/invalid-email') {
        await this.presentAlert('Invalid email address.');
      } else {
        await this.presentAlert('An error occurred during login. Please try again.');
      }
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']); // Redirect to signup page
  }

  // Email validation function (basic example)
  isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // Function to display alert
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToPasswordReset() {
    this.router.navigate(['/password-reset']); // Navigate to the password reset page
  }
  
}
