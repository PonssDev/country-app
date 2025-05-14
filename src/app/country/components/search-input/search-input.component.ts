import { Component, output, } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  value = output<string>()
}
