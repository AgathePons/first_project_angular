import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'
})
export class BubbleDirective implements OnInit {
  private _defaultConfig: any = {
    display: 'inline-block',
    height: '40px',
    width: '40px',
    lineHeight: '40px',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '.9rem',
    backgroundColor: '#200220',
  };
  /**
   * Object that merge default and config
   */
  private _config: any = {};

  @Input() public set config(inputConfig: any) {
    // logic here
    for (const property in this._defaultConfig) {
      if (inputConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property]
      } else {
        this._config[property] = this._defaultConfig[property];
      }
    }
    for (const property in inputConfig) {
      if (!this._defaultConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      }
    }
  };
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {
    console.log(`constrictor bip bip boup`);
  }

  ngOnInit(): void {
    console.log(`appBubble is here bitches!!`);
    let nativeElement: HTMLElement = this.elementRef.nativeElement;

    // this.renderer.setStyle(nativeElement, 'fontWeight', 'bold'); good practice
    // nativeElement.style.fontWeight = 'bold'; bad practice

    for (const property in this._config) {
      this.renderer.setStyle(nativeElement, property, this._config[property]);
    }
  }
}
