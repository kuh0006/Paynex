import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../shared/material-module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
