import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiveSearchTemplate } from '../objects';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.css']
})
export class LiveSearchComponent implements OnChanges {

  @Output() onSearchEmitter: EventEmitter<string> = new EventEmitter();
  @Output() onItemClick: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: string;
  @Input() searchResult: LiveSearchTemplate[];

  private showResultList = false;

  constructor() { }

  ngOnChanges() {
    this.showResultList = this.searchResult ? true : false;
  }

  onSearch(event) {
    this.onSearchEmitter.emit(event.target.value);
  }

  onBlur(event) {
    if(!event.relatedTarget || (event.relatedTarget && !event.relatedTarget.classList.contains('searchResultItem'))) {
      this.showResultList = false;
    }
  }

  onFocus() {
    this.showResultList = true;
  }

  onClick(template) {
    this.onItemClick.emit(template);
    this.showResultList = false;
  }

}
