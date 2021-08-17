import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserProfileService } from './../../services/user-profile-service';
import { State } from '../../auth/store/auth.reducers';

@Directive({ selector: '[canUserAccess]' })
export class CanUserAccessDirective implements OnInit, OnDestroy {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private readonly userProfileService: UserProfileService) {
    }

    private userState: Observable<State>;
    private permission: string;

    private userStateSubscription: Subscription;

    @Input()
    set canUserAccess(permission: string) {
        this.permission = permission;
    }

    @Input('canUserAccessUserState')
    set setUserState(userState: Observable<State>) {
        this.userState = userState;
    }

    ngOnInit() {
        this.userStateSubscription = this.userState?.subscribe((data: any) => {
            const { authonticated: isUserAuthenticated, authToken: hasAuthToken } = data;
            if (!isUserAuthenticated || (isUserAuthenticated && hasAuthToken)) {
                this.setTemplate();
            }
        });
    }

    private setTemplate() {
      this.viewContainer.clear();
        if (this.userProfileService.hasPermission(this.permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    }

    ngOnDestroy() {
        this.userStateSubscription?.unsubscribe();
    }
}
