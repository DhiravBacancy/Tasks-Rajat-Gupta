import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHighcharts } from 'highcharts-angular'; // ✅ import this
import { HighchartsChartModule } from 'highcharts-angular'; // ✅ add this


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHighcharts({
      instance: () => import('highcharts'),
      modules: () => [
        import('highcharts/modules/bullet').then(m => m.default as any),
        import('highcharts/modules/exporting').then(m => m.default as any),
        import('highcharts/modules/accessibility').then(m => m.default as any)
      ]
    })
  ],
};
