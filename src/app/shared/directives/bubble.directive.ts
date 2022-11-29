import { asNativeElements, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'
})
export class BubbleDirective implements OnInit {
  /**
   * Default config
   */
  private _defaultConfig: any = {
    display: 'inline-block',
    height: '40px',
    width: '40px',
    lineHeight: '40px',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '.9rem',
    color: '#fff',
    backgroundColor: '#200220',
  };
  /**
   * Object that merge default and inputConfig
   */
  private _config: any = {};

  @Input() public set config(inputConfig: any) {
    // if property in inputConfig override defaultConfig
    for (const property in this._defaultConfig) {
      if (inputConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property]
      } else {
        this._config[property] = this._defaultConfig[property];
      }
    }
    // if property in inputConfig add new property
    for (const property in inputConfig) {
      if (!this._defaultConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      }
    }
  };

  private _parentCall: any;
  @Input() set onBubbleClick(calledFunction: any) {
    this._parentCall = calledFunction;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    let nativeElement: HTMLElement = this.elementRef.nativeElement;

    // this.renderer.setStyle(nativeElement, 'fontWeight', 'bold'); good practice
    // nativeElement.style.fontWeight = 'bold'; bad practice

    for (const property in this._config) {
      this.renderer.setStyle(nativeElement, property, this._config[property]);
    }
  }

  @HostListener('click') onClick() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    this.renderer.addClass(nativeElement, 'awesome-rotate');
    /* setTimeout(
      () => {
        this.renderer.removeClass(nativeElement, 'awesome-rotate')
      },
      5000
    ); */
  }
}
