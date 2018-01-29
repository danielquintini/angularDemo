import { Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard]
    }];
  }

  /**
   * Creates routes using authentication but without using the shell component.
   * @param routes The routes to add.
   * @return {Routes} The new routes.
   */
  static withoutShell(routes: Routes): Routes {
    return [{
      path: routes[0].path,
      component: routes[0].component,
      canActivate: [AuthenticationGuard]
    }];
  }

}
