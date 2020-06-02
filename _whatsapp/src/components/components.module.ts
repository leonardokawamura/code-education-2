import { NgModule } from '@angular/core';
import { FirebasePhoneNumberCheckComponent } from './firebase-phone-number-check/firebase-phone-number-check';
import { SelectCountriesCodeComponent } from './select-countries-code/select-countries-code';
import { MoreOptionsComponent } from './more-options/more-options';
@NgModule({
	declarations: [FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent],
	imports: [],
	exports: [FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent]
})
export class ComponentsModule {}
