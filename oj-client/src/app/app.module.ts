import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServicesService } from './services/services.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent} from './components/problem-detail/problem-detail.component';
import {routing} from './routes';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { EditorComponent} from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: 'data',
    useClass: ServicesService },
    {
      provide: 'auth',
      useClass: AuthService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
