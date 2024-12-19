import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WishlistPage implements OnInit {
  wishlist: any[] = [];
  selectedNavigation: string = 'home';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Load the wishlist from localStorage on initialization
    this.loadWishlist();
  }

  // Method to load wishlist from localStorage
  loadWishlist() {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    console.log('Wishlist loaded from localStorage:', this.wishlist);
  }

  // Method to confirm removal of a single movie
  async confirmRemove(movie: any) {
    const alert = await this.alertController.create({
      header: 'Remove Movie',
      message: `Are you sure you want to remove "${movie.title}" from your wishlist?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Remove action cancelled');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeFromWishlist(movie);  // Call remove method if confirmed
          }
        }
      ]
    });

    await alert.present();
  }

  // Method to remove a single movie from the wishlist
  async removeFromWishlist(movie: any) {
    // Remove the movie from the wishlist
    this.wishlist = this.wishlist.filter(item => item.id !== movie.id);

    // Update local storage with the new wishlist
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

    // Show a toast to inform the user that the movie has been removed
    this.showToast('Movie removed from your wishlist');
  }

  // Method to confirm removal of all movies from the wishlist
  async confirmRemoveAll() {
    if (this.wishlist.length === 0) {
      const alert = await this.alertController.create({
        header: 'Nothing to Remove',
        message: 'Your wishlist is empty. Go to the Movies page to add a movie to your wishlist.',
        buttons: [
          {
            text: 'Go to Movies',
            handler: () => {
              this.router.navigate(['/movie-details']);  // Navigate to the Movies page
            }
          },
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Nothing to remove action closed');
            }
          }
        ]
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Remove All Movies',
        message: 'Are you sure you want to remove all movies from your wishlist?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Remove all action cancelled');
            }
          },
          {
            text: 'Remove All',
            handler: () => {
              this.removeAllFromWishlist();  // Call remove all method if confirmed
            }
          }
        ]
      });

      await alert.present();
    }
  }

  // Method to remove all movies from the wishlist
  removeAllFromWishlist() {
    // Clear the wishlist array
    this.wishlist = [];

    // Update local storage with the new empty wishlist
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

    // Show a toast to inform the user that all movies have been removed
    this.showToast('All movies removed from your wishlist');
  }

  // Function to show a toast message
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  
      position: 'top',  
      color: 'danger',  
    });
    toast.present();
  }

  // Navigation method for dropdown selection
  onNavigationChange() {
    if (this.selectedNavigation === 'home') {
      this.router.navigate(['/home']);  // Navigate to homepage
    } else if (this.selectedNavigation === 'movies') {
      this.router.navigate(['/movie-details']);  // Navigate to movies page
    }
  }

  // Trigger reload of wishlist data on page visit (after navigating to wishlist page)
  ionViewWillEnter() {
    this.loadWishlist();
  }
}
