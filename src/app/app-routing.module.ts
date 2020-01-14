import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list_test',
    redirectTo: 'list-testing',
    pathMatch: 'full'
  },
  {
    path: 'list-testing',
    loadChildren: () => import('./online_testing/list-testing/list-testing.module').then(m => m.ListTestingPageModule)
  },
  {
    path: 'review-student',
    loadChildren: () => import('./Exam_review/review-student/review-student.module').then(m => m.ReviewStudentPageModule)
  },
  {
    path: 'detail-testing',
    loadChildren: () => import('./online_testing/detail-testing/detail-testing.module').then(m => m.DetailTestingPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./online_testing/testing/testing.module').then(m => m.TestingPageModule)
  },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'review-student', loadChildren: './Exam_review/review-student/review-student.module#ReviewStudentPageModule' },
  { path: 'regis', loadChildren: './regis/regis/regis.module#RegisPageModule' },
  { path: 'admin', loadChildren: './admin/admin/admin.module#AdminPageModule' },
  { path: 'item', loadChildren: './item/item/item.module#ItemPageModule' },
  { path: 'user', loadChildren: './user/user/user.module#UserPageModule' },
  { path: 'edit', loadChildren: './editexam/edit/edit.module#EditPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
