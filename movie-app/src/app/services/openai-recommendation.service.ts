import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface MovieRecommendation {
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeminiRecommendationService {
  private apiKey = environment.geminiApiKey;
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  generateRecommendations(movies: any[], userQuery: string): Observable<MovieRecommendation[]> {
    const movieTitles = movies.slice(0, 10).map((m) => m.title).join(', ');

    const payload = {
      prompt: `You are a movie recommendation assistant. 
               Based on these movies: ${movieTitles}, and the user's query: "${userQuery}", 
               recommend 5 movies with descriptions in the format:
               Title - Description.`,
      maxOutputTokens: 300,
    };

    return this.http.post(this.apiUrl, payload).pipe(
      map((response: any) => {
        const recommendationText = response.candidates?.[0]?.output || '';
        return this.parseRecommendations(recommendationText);
      }),
      catchError((error) => {
        console.error('Gemini API Error:', error);
        return throwError(() => error);
      })
    );
  }

  private parseRecommendations(text: string): MovieRecommendation[] {
    return text.split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => {
        const [title, description] = line.split(' - ');
        return {
          title: title.trim(),
          description: description?.trim(),
        };
      });
  }
}
