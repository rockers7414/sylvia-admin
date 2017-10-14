import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistMgrPageComponent } from './artist-mgr-page/artist-mgr-page.component';
import { AlbumMgrPageComponent } from './album-mgr-page/album-mgr-page.component';
import { TrackMgrPageComponent } from './track-mgr-page/track-mgr-page.component';

export const routes: Routes = [
  { path: 'artist', component: ArtistMgrPageComponent },
  { path: 'album', component: AlbumMgrPageComponent },
  { path: 'track', component: TrackMgrPageComponent },
  { path: '**', redirectTo: 'artist' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
