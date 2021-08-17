import { Injectable } from '@angular/core';
import { IUserProfile } from '../core/models/user-profile';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private userProfile: IUserProfile;
    private readonly userProfileLocalStorageKey: string = 'userProfile';

    constructor() {
        this.userProfile = this.getUserProfileFromLocalStorage();
    }

    setUserProfile(userProfile: IUserProfile) {
        this.userProfile = userProfile;
        this.saveUserProfileToLocalStorage();
    }

    hasPermission(permission: string) {
        return this.userProfile?.permissions?.includes(permission);
    }

    logout() {
        this.userProfile = null;
    }
    getProfileName()
    {
      let _userProfile: IUserProfile;
      const stringifiedUserProfile: string = localStorage.getItem(this.userProfileLocalStorageKey);
      if (stringifiedUserProfile) {
          _userProfile = JSON.parse(stringifiedUserProfile);
      }

      return _userProfile?.name;
    }

    private saveUserProfileToLocalStorage() {

        localStorage.setItem(this.userProfileLocalStorageKey, JSON.stringify(this.userProfile));
    }

    private getUserProfileFromLocalStorage() {
        let _userProfile: IUserProfile;
        const stringifiedUserProfile: string = localStorage.getItem(this.userProfileLocalStorageKey);
        if (stringifiedUserProfile) {
            _userProfile = JSON.parse(stringifiedUserProfile);
        }

        return _userProfile;
    }
}
