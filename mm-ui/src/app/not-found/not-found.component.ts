import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../shared/material-module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  // Navigation can be added here if needed
}
