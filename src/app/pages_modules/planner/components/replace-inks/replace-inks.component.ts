import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'replace-inks',
  templateUrl: './replace-inks.component.html',
  styleUrls: ['./replace-inks.component.scss']
})
export class ReplaceInksComponent implements OnInit {
  @Input() inksArr: string[];
  constructor() {}

  ngOnInit() {}
}
