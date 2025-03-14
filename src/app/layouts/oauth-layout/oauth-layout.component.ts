import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-oauth-layout',
  templateUrl: './oauth-layout.component.html',
  styleUrl: './oauth-layout.component.scss',
  imports: [RouterOutlet],
})
export class OAuthLayoutComponent {

}
