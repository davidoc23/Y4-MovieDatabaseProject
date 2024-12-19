import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation
import { IonicModule, ModalController, AlertController } from '@ionic/angular'; // Import AlertController
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component';
import { MovieRecommendation, GeminiRecommendationService } from '../services/openai-recommendation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule, FormsModule], 
  providers: [
    GeminiRecommendationService
  ]
})

export class MovieDetailsPage implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  selectedMovieType: string = 'all';
  selectedSortCriteria: string = 'popularity';  // Default sort by popularity
  private apiKey = 'fdfe9e064713c2c350d8d553832c1c51';
  private apiUrl = 'https://api.themoviedb.org/3';
  searchTerm: string = '';
  wishlist: any[] = [];  // Wishlist array to store selected movies
  selectedNavigation: string = 'home';
  selectedMovies: any[] = [];  // Array to store selected movies
  userQuery: string = ''; // Holds the user's query
  recommendedMovies: any[] = []; // Array to store AI-recommended movies
  email: string = '';
  password: string = '';
  
  
  aiRecommendations: MovieRecommendation[] = [];
  isLoading: boolean = false;

  constructor(
    private http: HttpClient, 
    private modalController: ModalController, 
    private router: Router,
    private alertController: AlertController  ,
    private openaiService: GeminiRecommendationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchMovies();
  }

  // Fetch movies based on selected category
  fetchMovies() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let endpoint = '';

    switch (this.selectedMovieType) {
      case 'popular':
        endpoint = '/movie/popular';
        break;
      case 'trending':
        endpoint = '/trending/movie/day';
        break;
      case 'all':
        endpoint = '/discover/movie';
        break;
      default:
        endpoint = '/discover/movie';
        break;
    }

    const url = `${this.apiUrl}${endpoint}?api_key=${this.apiKey}`;

    this.http.get(url).subscribe({
      next: (response: any) => {
        this.movies = response.results; 
        this.filteredMovies = [...this.movies];  // Initialize filtered movies with all fetched movies

        // Mark movies as already added to wishlist and disable the checkbox 
        this.movies.forEach(movie => { 
          movie.isInWishlist = wishlist.some((item: any) => item.id === movie.id);
        });

        // Apply sorting immediately based on the default or selected sort criteria
        this.sortMovies();
      },
      error: (error: any) => {
        console.error('API Error:', error);
      }
    });
  }

  // Sort movies based on the selected sort criteria
  sortMovies() {
    switch (this.selectedSortCriteria) {
      case 'popularity':
        this.filteredMovies.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'vote_average':
        this.filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'vote_count':
        this.filteredMovies.sort((a, b) => b.vote_count - a.vote_count);
        break;
      default:
        break;
    }
  }

  // Handle checkbox changes
  async onMovieCheckboxChange(movie: any, isChecked: boolean) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isChecked) {
      if (wishlist.some((item: any) => item.id === movie.id)) {
        await this.showAlreadyInWishlistPopup();
        movie.selected = false;
      } else {
        this.selectedMovies.push(movie);
      }
    } else {
      this.selectedMovies = this.selectedMovies.filter(m => m.id !== movie.id);
    }
  }

  async addSelectedToWatchlist() {
    if (this.selectedMovies.length === 0) {
      await this.showSelectMoviesFirstPopup();
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.selectedMovies.forEach(movie => {
      if (!wishlist.some((item: any) => item.id === movie.id)) {
        wishlist.push(movie);
      }
    });

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    this.selectedMovies = [];
    this.filteredMovies.forEach(movie => movie.selected = false);

    await this.showSuccessPopup();
  }

  async showSuccessPopup() {
    const alert = await this.alertController.create({
      header: 'Movies Added!',
      message: 'The selected movies have been added to your wishlist. Do you want to go to the wishlist page?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/wishlist']);
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlreadyInWishlistPopup() {
    const alert = await this.alertController.create({
      header: 'Already in Wishlist',
      message: 'This movie is already in your wishlist.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSelectMoviesFirstPopup() {
    const alert = await this.alertController.create({
      header: 'No Movies Selected',
      message: 'Please select at least one movie to add to your wishlist.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async openMovieModal(movie: any) {
    const modal = await this.modalController.create({
      component: MovieDetailModalComponent,
      componentProps: { movie }
    });
    await modal.present();
  }

  filterMovies() {
    if (!this.searchTerm.trim()) {
      this.filteredMovies = [...this.movies];  // Reset to full list if search term is empty
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    // Apply sorting after filtering
    this.sortMovies();
  }

  onNavigationChange() {
    switch (this.selectedNavigation) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'wishlist':
        this.router.navigate(['/wishlist']);
        break;
      default:
        console.warn('Unknown navigation option:', this.selectedNavigation);
    }
  }

  // Call this function to process the user's query and fetch movie recommendations
  getMovieRecommendations() {
    if (this.userQuery.trim()) {
      this.isLoading = true;
      this.openaiService
        .generateRecommendations(this.movies, this.userQuery)
        .subscribe({
          next: (recommendations) => {
            this.aiRecommendations = recommendations;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Recommendation Error', error);
            this.isLoading = false;
          }
        });
    }
  }  
    
  // Optionally, you can also filter your current list of movies based on the user's query
  filterMoviesByQuery() {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.userQuery.toLowerCase())
    );
  }

  async logout() {
    try {
      await this.authService.logout(); // Log the user out
      this.email = ''; // Clear email field
      this.password = ''; // Clear password field
      this.router.navigate(['/login']); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
