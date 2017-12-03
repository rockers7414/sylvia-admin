import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Track } from '../objects';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.css']
})
export class TracksListComponent implements OnInit {

  @Input() tracks: Track[];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(content) {
    console.log(typeof(content));
    console.log(content);
    this.modalService.open(content);
  }
}
