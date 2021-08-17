<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Events\EventExample;
use App\User;
use Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Models\Role;

class LoginController extends Controller
{
    //
    function loginUser(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:4'],
        ]);

        try {

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['Email or Password credentials are incorrect.'],
                ]);
            }
           
            //send token to the register user
            $token = $user->createToken('Laravel-Sanctum')->plainTextToken;

            event(new EventExample($user));
           /* if ($user->getRoleNames()[0] == 'admin') {

                $user['permissions'] = ['users_list', 'con_list', 'technologies_list', 'hot_list', 'jobs_list', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list', 'documents', 'submission_list', 'submission_create', 'resume_search'];

            } else if ($user->getRoleNames()[0] == 'recruiter') {

                if ($user->isResume) {
                    $user['permissions'] = ['con_list', 'technologies_list', 'hot_list', 'jobs_list','resume_search'];

                }else{
                    $user['permissions'] = ['con_list', 'technologies_list', 'hot_list', 'jobs_list'];
                }
            } else if ($user->getRoleNames()[0] == 'accountmanager') {

                if ($user->isResume) {
                    $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list', 'resume_search'];
                }else{
                    $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list'];
                }

            } else if ($user->getRoleNames()[0] == 'bdm') {
                if ($user->isResume) {
                $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list', 'resume_search'];
                }else{
                    $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list'];
                }
            } else if ($user->getRoleNames()[0] == 'a-b-manager') {
                if ($user->isResume) {
                $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list', 'resume_search'];
                }else{
                    $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'jobs_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list', 'partners_list'];
                }
            } else if ($user->getRoleNames()[0] == 'head-hunters') {
                if ($user->isResume) {
                $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'technologies_list','resume_search'];
                }else{
                    $user['permissions'] = ['con_list', 'hot_list', 'jobs_list', 'technologies_list'];
                }

            } else if ($user->getRoleNames()[0] == 'adminhunters') {
                if ($user->isResume) {
                $user['permissions'] = ['con_list', 'hot_list', 'technologies_list', 'jobs_list','resume_search'];
                }else{
                    $user['permissions'] = ['con_list', 'hot_list', 'technologies_list', 'jobs_list'];
                }

            } else if ($user->getRoleNames()[0] == 'bench-sales' || $user->getRoleNames()[0] == 'jr-bench-sales') {
                if ($user->isResume) {

                $user['permissions'] = ['hot_list', 'documents', 'submission_list', 'submission_create', 'resume_search', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list'];
                }else{
                    $user['permissions'] = ['hot_list', 'documents', 'submission_list', 'submission_create',  'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list'];
                }

            } else if ($user->getRoleNames()[0] == 'sales-lead') {
                if ($user->isResume) {

                $user['permissions'] = ['hot_list', 'documents', 'submission_list', 'submission_create', 'resume_search', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list'];
                }else{
                    $user['permissions'] = ['hot_list', 'documents', 'submission_list', 'submission_create', 'prime_vendor_list', 'clients_list', 'vendorsubmissions_clients_list'];
                }

            } else {
                $user['permissions'] = [];
            }
            */
            $allowedStatus = ['A'];
            $userStaus     = $user->user_status;
            if (!in_array($userStaus, $allowedStatus, TRUE)) {
                // Logged user activity

                \Auth::logout();
                return $this->userStatusRestric($userStaus);
            }
     //       $role = Role::findByName('admin');
        //    $permission = Permission::create(['name' => 'NewArt']);
//$role->givePermissionTo('NewArt');

           /* $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",1)
            ->get(); */
          //  $permissionNames = Permission::getPermissions(); // collection of name strings
            
         //   $permissions =   $user->getPermissionNames(); // collection of permission objects
      //      $user2 = auth()->user();

            // get all inherited permissions for that user
            $permissions =  $user->getPermissionsViaRoles();
            $permissions = $permissions->pluck('name');
          
            if ($user->isResume) 
                {
                   // if(in_array("resume_search", $permissions))
                    //    {}else{
                          $permissions[]="resume_search";
                    //    }
                   // if(isset($permissions["resume_search"]))
                 //   {
                      //  unset($permissions["resume_search"]);
                 //   }else{
                     //   $permissions[]=["resume_search"];
                 //   }
                   
                }
           
            $user['permissions'] =$permissions;
           
            return response()->json([
                'status_code' => 200,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                 'permissions' =>'',
                'role' => $user->getRoleNames()
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    protected function userStatusRestric($status)
    {
        throw ValidationException::withMessages([
            'email' => ['User Blocked'],
        ]);
    }
}
