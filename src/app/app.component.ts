import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Settings, Item } from './models';
import { } from '@angular/forms'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  frm: FormGroup;
  settings: Settings = new Settings();
  item: Item = new Item();
  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef) {
    this.settings = new Settings();
    // chrome.storage.local.get((storage) => {
    //   console.log("From Local", storage.ebayCalcSettings);
    // });
  }
  ngOnInit() {
     if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.sync.get((settings) => {
        if (settings.ebayCalcSettings) {
          this.item = <Item> settings.ebayCalcSettings;
          this.settings = <Settings> settings.ebayCalcSettings;
        } else {
          this.saveSettings();
        }
        this.frm.patchValue(this.item);
        this.frm.updateValueAndValidity();
        this.ref.detectChanges();
        
      });
     }
     console.log(this.item);
    this.frm = this.formBuilder.group(this.item);
    
    this.onChanges();
  }

  onChanges(): void {
    this.frm.valueChanges.subscribe(val => {
      this.item = val;
      if (this.settings.taxesIncluded) {
        this.settings.taxesOnFinallPrice = true;
      }
      console.log(this.item);
    });
    this.frm.controls["taxesIncluded"].valueChanges.subscribe(taxesIncluded => {
      this.settings.taxesIncluded = taxesIncluded;
      this.saveSettings();
    });
    this.frm.controls["taxes"].valueChanges.subscribe(taxes => {
      this.settings.taxes = taxes;
      this.saveSettings();
    });
    this.frm.controls["taxesOnFinallPrice"].valueChanges.subscribe(taxesOnFinallPrice => {
      this.settings.taxesOnFinallPrice = taxesOnFinallPrice;
      this.saveSettings();
    });
  }

  saveSettings() {
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.sync.set({'ebayCalcSettings': this.settings}, () => {

      });
    }
  }

  calculate() {
    
  }
}
