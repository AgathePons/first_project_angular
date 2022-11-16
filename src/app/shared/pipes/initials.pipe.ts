import { Pipe, PipeTransform } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { VariantType } from './variant-type';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  private variant: VariantType | undefined = undefined;

  transform(value: unknown, ...args: any[]): string {

    if (value instanceof Stagiaire) {

      this.variant = args[0];
      return this.getInitials(value, args).toUpperCase();
    } else {
      throw new Error('value is not a Stagiaire object');
    }
  }

  private getInitials(stagiaire: Stagiaire, variation: unknown[]): string {
    if (this.variant !== undefined && this.variant.firstNameFirst === false) {
      return this.lastNameFirst(stagiaire);
    }
    return this.firstNameFirst(stagiaire);
  }

  private firstNameFirst(stagiaire: Stagiaire): string {
    return this.getInitialsFirstName(stagiaire) + stagiaire.getLastName().charAt(0);
  }

  private lastNameFirst(stagiaire: Stagiaire): string {
    return stagiaire.getLastName().charAt(0) + this.getInitialsFirstName(stagiaire);
  }

  private getInitialsFirstName(stagiaire: Stagiaire): string {
    if (this.variant && this.variant.full) {
      const dashPosition: number = stagiaire.getFirstName().indexOf('-');
      if (dashPosition !== -1) {
        return stagiaire.getFirstName().charAt(0) + stagiaire.getFirstName().charAt(dashPosition + 1);
      }
    }
    return stagiaire.getFirstName().charAt(0);
  }
}
