import { Pipe, PipeTransform } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if (value instanceof Stagiaire) {
      return this.getInitials(value, args).toUpperCase();
    } else {
      throw new Error('value is not a Stagiaire object');
    }
  }

  private getInitials(stagiaire: Stagiaire, variation: unknown[]): string {
    const variant: any = variation[0];
    if (variant !== undefined && variant.firstNameFirst === false) {
      return this.lastNameFirst(stagiaire);
    }
    return this.firstNameFirst(stagiaire);
  }

  private firstNameFirst(stagiaire: Stagiaire): string {
    return stagiaire.getFirstName().charAt(0) + stagiaire.getLastName().charAt(0);
  }

  private lastNameFirst(stagiaire: Stagiaire): string {
    return stagiaire.getLastName().charAt(0) + stagiaire.getFirstName().charAt(0);
  }
}
