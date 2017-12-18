import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiveSearchTemplate } from '../objects';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.css']
})
export class LiveSearchComponent implements OnInit {

  @Output() onSearchEmitter: EventEmitter<string> = new EventEmitter();
  @Input() composeTemplate: Function;
  @Input() searchResultObserver: Observable<any[]>;

  private templates: LiveSearchTemplate[];
  private showResultList = false;

  constructor() { }

  ngOnInit() {
    this.searchResultObserver.subscribe(result => {
      this.templates = this.composeTemplate(result);
      console.log(this.templates);
      this.showResultList = true;
    });
  }

  onSearch(event) {
    this.onSearchEmitter.emit(event.target.value);
  }

  onBlur(event) {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

}
