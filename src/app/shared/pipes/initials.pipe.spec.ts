import { Stagiaire } from 'src/app/core/models/stagiaire';
import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  it('create an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return JA with no args', () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');

    const pipe = new InitialsPipe();

    expect(pipe.transform(stagiaire)).toBe('JA');
  })
});
