import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  public readonly countries = signal<Country[]>([])

  public readonly isError = signal<string | null>(null)

  public readonly isLoading = signal(false)

  private readonly countryService = inject(CountryService)

  onSearch(query: string): void {
    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)
    this.countryService.searchByCountry(query).subscribe({
      next: (countries) => {
        this.isLoading.set(false)
        this.countries.set(countries)
      },
      error: (err) => {
        this.isLoading.set(false)
        this.countries.set([])
        this.isError.set(err)
      }
    })
  }

}
