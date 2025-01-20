import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  standalone: true,
})
export class EventDetailsComponent implements OnInit {
  attendees: any[] = [];
  eventName: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadEvent(id);
    this.loadAttendees(id);
  }

  loadEvent(id: string | null): void {
    this.http.get<any>(`http://localhost:5000/api/events/${id}`).subscribe(
      (event) => {
        this.eventName = event.name; // Salvează numele evenimentului
      },
      (error) => {
        console.error('Error fetching event:', error);
      }
    );
  }

  loadAttendees(id: string | null): void {
    this.http
      .get<any[]>(`http://localhost:5000/api/events/${id}/attendees`)
      .subscribe(
        (data) => {
          this.attendees = data; // Salvează lista participanților
        },
        (error) => {
          console.error('Error fetching attendees:', error);
        }
      );
  }
}
