import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Settings, Item, Calculations } from './models';
import { } from '@angular/forms'
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ebayFees = 0.10;
  fixedPayPalFees = 0.30;
  payPalFees = 0.029;

  frm: FormGroup;
  settings: Settings = new Settings();
  item: Item = new Item();
  calculated: Calculations = new Calculations();
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
      this.calculate();
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
    if (!this.item.taxesIncluded) {
      this.calculated.taxes = (this.item.price * this.item.taxes) / 100;
      this.calculated.finalPrice = (this.item.taxesOnFinallPrice? 
          this.item.price : this.item.discountedPrice) + this.calculated.taxes;
    } else {
      this.calculated.finalPrice = this.item.price;
    }
    this.calculated.finalWithShiping = this.calculated.finalPrice + this.item.shipping;
    this.calculateSuggestedPrice();

      if (this.item.listingPrice) {
         const fees = this.calculateEbayPaypalFees(this.item.listingPrice);
         this.calculated.ebayFees = fees.ebay;
         this.calculated.paypalFees = fees.payPal;
        this.calculated.lossGain = this.item.listingPrice - 
          (this.calculated.finalWithShiping + this.calculated.ebayFees + this.calculated.paypalFees);
      } else {
        const fees = this.calculateEbayPaypalFees(this.calculated.suggestedPrice);
        this.calculated.ebayFees = fees.ebay;
        this.calculated.paypalFees = fees.payPal;
        this.calculated.lossGain = this.calculated.suggestedPrice - 
          (this.calculated.finalWithShiping + this.calculated.ebayFees + this.calculated.paypalFees);
      }

  }
  calculateEbayPaypalFees(price: number) : {ebay: number, payPal: number} {
      let payPal = ((price) * this.payPalFees) + this.fixedPayPalFees;
      let ebay = (price * this.ebayFees);
      return {
        ebay: ebay,
        payPal: payPal
      }
  }

  calculateSuggestedPrice() {
    const payPalFixedSuggestedFinal = (this.fixedPayPalFees * 100) / 87.1;
    this.calculated.suggestedPrice = (((this.calculated.finalWithShiping) * 100) / 87.1) + payPalFixedSuggestedFinal;
    
  }
}
