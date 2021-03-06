import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fontawesome } from 'fontawesome';
import {
  // MatAutocompleteModule,
  MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule ,
    MatChipsModule,
  // MatDatepickerModule,
  // MatDialogModule,
   MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatIconModule,
    MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatStepperModule,
  // MatTableModule,
  MatTabsModule,
  // MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
