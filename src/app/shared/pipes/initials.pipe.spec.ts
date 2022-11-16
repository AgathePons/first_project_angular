import { Stagiaire } from 'src/app/core/models/stagiaire';
import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  it('create an instance', () => {
    const pipe: InitialsPipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return JA with no args', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');
    const pipe: InitialsPipe = new InitialsPipe();
    expect(pipe.transform(stagiaire)).toBe('JA');
  });

  it('Should return AJ with firstNameFirst set to false', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');
    const pipe: InitialsPipe = new InitialsPipe();
    const variation = { firstNameFirst: false }
    expect(pipe.transform(stagiaire, variation)).toBe('AJ');
  });

  it('Should return JLA with full property sets to true', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');
    const pipe: InitialsPipe = new InitialsPipe();
    const variation: any = {full: true};
    expect(pipe.transform(stagiaire, variation)).toBe('JLA');
  });

  it(`Should return AJL with full property sets to true and firstNameFirst to false`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');
    const pipe: InitialsPipe = new InitialsPipe();
    const variation: any = {firstNameFirst: false, full: true};
    expect(pipe.transform(stagiaire, variation)).toBe('AJL');
  });

  it('Should throw an Error if value is not a Stagiaire instance', () => {
    const stagiaire: any = 'something';
    const pipe: InitialsPipe = new InitialsPipe();
    expect(() => pipe.transform(stagiaire)).toThrowError();
  });

  it('Should return JA even if full is set to true', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean');
    const pipe: InitialsPipe = new InitialsPipe();
    const variation: any = {full: true};
    expect(pipe.transform(stagiaire, variation)).toBe('JA');
  });

  it('Should return JA even if dummy object was passed as variation', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean');
    const pipe: InitialsPipe = new InitialsPipe();
    const variation: any = {skwalala: 'YOLO'};
    expect(pipe.transform(stagiaire, variation)).toBe('JA');
  });
});
