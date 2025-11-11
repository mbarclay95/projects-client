import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { createUser, User } from '../../users/models/user.model';
import { computed, inject } from '@angular/core';
import { catchError, firstValueFrom, of, pipe, switchMap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { routes } from '../../shared/models/routes.model';
import { Permissions } from '../permissions';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserConfig } from '../../users/models/user-config.model';
import { AuthStorageService } from './auth-storage.service';
import { isMobile } from '../../app.component';

interface AuthState {
  auth: User | undefined;
  loading: boolean;
  badCredsError: boolean;
  expiredTokenError: boolean;
  otherError: boolean;
}

const initialState: AuthState = {
  auth: undefined,
  loading: false,
  badCredsError: false,
  expiredTokenError: false,
  otherError: false,
};

export const AuthSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ auth }) => ({
    isLoggedIn: computed(() => !!auth()?.id),
    userRoutes: computed(() => {
      const user = auth();
      if (!user) {
        return [];
      }
      return routes(isMobile).filter((route) => route.permission === true || user.clientPermissions.includes(route.permission));
    }),
    viewFamiliesTab: computed(() => !!auth()?.clientPermissions.includes(Permissions.FAMILIES_TAB)),
    showUptimeKuma: computed(() => !!auth()?.clientPermissions.find((p) => p === Permissions.LISTEN_TO_UPTIME_KUMA)),
    hasMoneyAppToken: computed(() => !!auth()?.userConfig.moneyAppToken),
  })),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const authStorageService = inject(AuthStorageService);
    // const setLoading = (loading: boolean) => patchState(store, { loading });
    const clearLoginErrors = () => patchState(store, { expiredTokenError: false, badCredsError: false, otherError: false });
    const handleLoginErrors = (error: HttpErrorResponse) => {
      console.log(error.error);
      switch (error.error.message) {
        case 'Unauthenticated.':
          patchState(store, { expiredTokenError: true });
          break;
        case 'Bad credentials':
          patchState(store, { badCredsError: true });
          break;
        default:
          patchState(store, { otherError: true });
      }
    };
    const login = async (username: string, password: string): Promise<boolean> => {
      clearLoginErrors();
      return await firstValueFrom(
        httpClient
          .post<{ accessToken: string }>(`${environment.apiUrl}/login`, {
            username,
            password,
          })
          .pipe(
            tap((token) => authStorageService.setAuthToken(token.accessToken)),
            map(() => true),
            catchError((error) => {
              handleLoginErrors(error);
              return of(false);
            }),
          ),
      );
    };

    const logout = async () => {
      await firstValueFrom(
        httpClient.post(`${environment.apiUrl}/logout`, {}).pipe(
          tap(() => {
            authStorageService.clearToken();
            patchState(store, { auth: undefined });
          }),
        ),
      );
    };

    const getMe = async () => {
      clearLoginErrors();
      await firstValueFrom(
        httpClient.get<User>(`${environment.apiUrl}/me`).pipe(
          map((user) => createUser(user)),
          tap((user) => {
            patchState(store, { auth: user });
            if (user.userConfig.moneyAppToken) {
              authStorageService.setMoneyAppAuthToken(user.userConfig.moneyAppToken);
            }
          }),
          catchError((error) => {
            handleLoginErrors(error);
            return of(undefined);
          }),
        ),
      );
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
      await firstValueFrom(
        httpClient.post(`${environment.apiUrl}/change-password`, {
          currentPassword,
          newPassword,
        }),
      );
    };

    const hasPermissionTo = (permission?: Permissions): boolean => {
      const user = store.auth();
      if (!user) {
        return false;
      }
      if (!permission) {
        return true;
      }

      return user.clientPermissions.includes(permission);
    };

    const updateMe = rxMethod<{ changes: Partial<User> }>(
      pipe(
        switchMap(({ changes }) => {
          const user = store.auth();
          if (!user) {
            return of(undefined);
          }
          return httpClient.patch<User>(`${environment.apiUrl}/update-me`, { ...user, ...changes }).pipe(
            map((me) => createUser(me)),
            tap((me) => patchState(store, { auth: me })),
          );
        }),
      ),
    );

    const updateUserConfig = (changes: Partial<UserConfig>, saveToServer = true) => {
      const user = store.auth();
      if (user) {
        user.userConfig = { ...user.userConfig, ...changes };
        if (saveToServer) {
          updateMe({ changes: user });
        }
      }
    };

    return {
      login,
      logout,
      getMe,
      changePassword,
      hasPermissionTo,
      updateMe,
      updateUserConfig,
      clearLoginErrors,
      handleLoginErrors,
    };
  }),
);
