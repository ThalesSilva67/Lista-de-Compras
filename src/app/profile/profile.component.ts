import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent{

    profile: User | null | undefined;

    constructor(public authService: AuthService){}

    ngOnInit(): void {
        this.authService.user$.subscribe((success) => {
          this.profile = success;
        });
    }
}
