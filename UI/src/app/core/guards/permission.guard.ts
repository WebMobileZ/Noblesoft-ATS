import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile-service';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private router: Router,
        private userProfileService: UserProfileService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const canUserAccessRoute = this.userProfileService.hasPermission(route?.data?.permission);
        if (!canUserAccessRoute) {
            alert("You do not have permissions for this action. Please contact your administrator.");
            this.router.navigate(['/']);
        }

        return canUserAccessRoute;
    }
}
