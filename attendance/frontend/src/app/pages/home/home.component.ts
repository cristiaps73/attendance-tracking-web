import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, NgForOf, FormsModule], // Importă RouterModule, NgForOf și FormsModule
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  newEvent = { name: '', startTime: '', endTime: '' };

  constructor(private http: HttpClient) {
    console.log('HomeComponent initialized');
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<any[]>('http://localhost:5000/api/events').subscribe(
      (data) => {
        console.log('Events:', data); // Log pentru a verifica datele
        this.events = data;
      },
      (error) => {
        console.error('Error loading events:', error); // Log pentru erori
      }
    );
  }

  createEvent(): void {
    this.http.post('http://localhost:5000/api/events', this.newEvent).subscribe(
      () => {
        this.loadEvents(); // Reîncarcă lista de evenimente după adăugare
        this.newEvent = { name: '', startTime: '', endTime: '' }; // Resetează formularul
      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );
  }
}
