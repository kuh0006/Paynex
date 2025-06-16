import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material-module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'mm-ui';
  protected sidenavOpened = true;
  protected isSmallScreen = false;
  
  constructor(private breakpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
    // Monitor screen size changes
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
      // Auto close sidenav on small screens
      if (this.isSmallScreen) {
        this.sidenavOpened = false;
      } else {
        this.sidenavOpened = true;
      }
    });
  }
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
