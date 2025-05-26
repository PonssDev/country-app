import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent {
  public countryCode = inject(ActivatedRoute).snapshot.params['code'];
  private readonly countryService = inject(CountryService);

  // Signals para manejar el estado
  public country = signal<Country | null>(null);
  public isLoading = signal(true);
  public hasError = signal(false);

  constructor() {
    this.loadCountry();
  }

  loadCountry() {
    if (!this.countryCode) {
      this.hasError.set(true);
      this.isLoading.set(false);
      return;
    }

    this.countryService.searchCountryByAlphaCode(this.countryCode)
      .subscribe({
        next: (country) => {
          if (country) {
            this.country.set(country);
          } else {
            this.hasError.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
  }
}

