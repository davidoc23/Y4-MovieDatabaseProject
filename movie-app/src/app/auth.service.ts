import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User, sendPasswordResetEmail, signOut } from '@angular/fire/auth';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, ) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Update user status
    });
  }

  // Observable to track user authentication status
  isLoggedIn(): Observable<boolean> {
    return this.userSubject.asObservable().pipe(map((user) => !!user));
  }

  // Sign up method
  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login method
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Password reset method
  async resetPassword(email: string): Promise<void> {
    try {
      // Send password reset email using the modular Firebase SDK
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Logout method
  async logout() {
    try {
      await signOut(this.auth); // Sign out the user
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
