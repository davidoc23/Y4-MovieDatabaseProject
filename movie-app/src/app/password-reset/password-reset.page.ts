import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})


export class PasswordResetPage {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.message = 'Password reset email sent successfully.';
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Delay for 2 seconds to show the success message before redirecting
    } catch (error) {
      this.message = 'Error sending password reset email: ' + (error as any).message;
    }
  }
}