import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  public countryCode = inject(ActivatedRoute).snapshot.params['code']

  private readonly countryService = inject(CountryService)


}
