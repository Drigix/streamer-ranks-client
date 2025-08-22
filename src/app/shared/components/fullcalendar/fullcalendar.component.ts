import {Component, ViewChild} from '@angular/core';
import {COMMON_IMPORTS} from '../../imports.cont';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, EventClickArg, EventMountArg} from '@fullcalendar/core';
import multiMonthPlugin from '@fullcalendar/multimonth'
import plLocate from '@fullcalendar/core/locales/pl';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: 'fullcalendar.component.html',
  styleUrls: ['fullcalendar.component.scss'],
  standalone: true,
  imports: [...COMMON_IMPORTS, FullCalendarModule]
})
export class AppFullcalendarComponent {

  @ViewChild('calendar') calendarComponent?: FullCalendarComponent;

  readonly calendarOptions: CalendarOptions = {
    initialView: 'multiMonthFourMonth',
    plugins: [multiMonthPlugin],
    locale: plLocate,
    views: {
      multiMonthFourMonth: {
        type: 'multiMonth',
        duration: { months: 6 }
      }
    },
    multiMonthMaxColumns: 3,
    events: [
      {
        title: 'Delegacja (w składzie delord, mokrysuchar, bagieta)',
        start: '2025-09-01',
        end: '2025-09-21',
        allDay: true,
        extendedProps: { typ: 'delegacja', team: ['delord', 'mokrysuchar', 'bagieta'] }
      },
      {
        title: 'Japonia MokrySuchar i Delord + 2osoby',
        start: '2025-10-08',
        end: '2025-10-10',
        allDay: true,
        extendedProps: { typ: 'delegacja', team: ['delord', 'mokrysuchar', 'bagieta'] }
      }
    ],
    dayCellContent: (arg) => arg.dayNumberText,
    eventClick: (info: EventClickArg) => this.onEventClick(info),
    eventDidMount: (arg: EventMountArg) => {
      const team = Array.isArray(arg.event.extendedProps['team'])
        ? (arg.event.extendedProps['team'] as string[]).join(', ')
        : undefined;

      const lines = [
        arg.event.title,
        team ? `Skład: ${team}` : undefined
      ].filter(Boolean);

      arg.el.setAttribute('title', lines.join('\n')); // natywny tooltip (obsługuje \n)
    }
  };


  onEventClick(info: EventClickArg) {
    // przykładowa logika
    console.log('Kliknięto event:', {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      extendedProps: info.event.extendedProps
    });
  }
}
