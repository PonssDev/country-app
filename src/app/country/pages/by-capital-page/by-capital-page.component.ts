import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public readonly countries = signal<RESTCountry[]>([])

  private readonly isLoading = signal(false)

  private readonly isError = signal<string | null>(null)

  private readonly countryService = inject(CountryService)

  onSearch(query: string): void {

    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)

    this.countryService.searchByCapital(query)
      .subscribe((countries: RESTCountry[]) => {
        this.isLoading.set(false)
        this.countries.set(countries)

        console.log(countries)
      })
  }
}
