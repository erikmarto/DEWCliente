import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from '../interfaces/i-event';
@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(events: IEvent[], filterBy: string): any {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter ?
          events.filter(evt => evt.title.toLocaleLowerCase().includes(filter)) :
          events;
  }

}
