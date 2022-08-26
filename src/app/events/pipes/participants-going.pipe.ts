import { Pipe, PipeTransform } from '@angular/core';
import {Event} from "../models/event.model";
import {EventParticipant} from "../models/event-participant";

@Pipe({
  name: 'participantsGoing'
})
export class ParticipantsGoingPipe implements PipeTransform {

  transform(event: Event): EventParticipant[] {
    return event.eventParticipants.filter(p => p.isGoing);
  }

}
