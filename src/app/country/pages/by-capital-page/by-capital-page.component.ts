import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  public readonly countries = signal<Country[]>([])

  public readonly isError = signal<string | null>(null)

  public readonly isLoading = signal(false)

  private readonly countryService = inject(CountryService)

  onSearch(query: string): void {

    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)

    this.countryService.searchByCapital(query)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false)
          this.countries.set(countries)
        },
        error: (err) => {
          this.isLoading.set(false)
          this.countries.set([])
          this.isError.set(err)
        },
      })
  }
}
