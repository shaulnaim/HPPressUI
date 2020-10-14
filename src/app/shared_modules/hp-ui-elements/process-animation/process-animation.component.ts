import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'process-animation',
  template: `
    <div class="profile-main-loader">
      <div class="loader">
        <svg class="circular-loader" viewBox="25 25 50 50">
          <defs>
            <linearGradient id="FirstGradient">
              <stop offset="0%" style="stop-color: #73b7ff" />
              <stop offset="100%" style="stop-color: #faf8fd" />
            </linearGradient>
          </defs>
          <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="url(#FirstGradient)" stroke-width="2" />
        </svg>
      </div>
    </div>
  `,
  styleUrls: ['./process-animation.scss']
})
export class ProcessAnimationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
