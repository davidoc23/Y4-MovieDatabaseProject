import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IonicModule, AlertController } from '@ionic/angular'; // Import AlertController
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {}

  async signup() {
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
      const user = await this.authService.signup(this.email, this.password);
      console.log('User registered:', user);
      // After successful signup, navigate to the login page
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during signup:', error);

      // Show specific error messages based on the error
      if ((error as any).code === 'auth/email-already-in-use') {
        await this.presentAlert('This email is already in use.');
      } else if ((error as any).code === 'auth/invalid-email') {
        await this.presentAlert('Invalid email address.');
      } else if ((error as any).code === 'auth/weak-password') {
        await this.presentAlert('Password should be at least 6 characters.');
      } else {
        await this.presentAlert('An error occurred during signup. Please try again.');
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirect to login page
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
}
