import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // Import necessary modules
})
export class MovieDetailModalComponent {
  @Input() movie: any;  // Movie data passed from parent

  constructor(
    private modalController: ModalController,
    private toastController: ToastController  // Inject ToastController
  ) {}

  // Close the modal without passing any data
  closeModal() {
    this.modalController.dismiss();
  }

  // Add movie to wishlist and dismiss modal
  async addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if the movie already exists in the wishlist
    if (!wishlist.some((item: { id: any; }) => item.id === this.movie.id)) {
      wishlist.push(this.movie);  // Add the movie if it's not already in the wishlist
      localStorage.setItem('wishlist', JSON.stringify(wishlist));  // Save the updated wishlist to localStorage
      console.log('Movie added to wishlist:', this.movie);

      // Close the modal before showing the toast
      this.closeModal();

      // Show a success toast message
      this.showToast('Movie added to your wishlist!');
    } else {
      console.log('Movie is already in the wishlist');
      // Close the modal before showing the toast
      this.closeModal();

      // Show a message saying the movie is already in the wishlist
      this.showToast('This movie is already in your wishlist.');
    }
  }

  // Function to show a toast message
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Show for 2 seconds
      position: 'top', // Position at the top of the screen
      color: 'success', // You can customize the color here
    });
    toast.present();
  }
}
