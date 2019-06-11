
import {
  ElementRef,
  Renderer2
} from '@angular/core';


import {
  RippleDirective
} from './ripple.directive';


describe('RippleDirective', () => {

  let testElement = document.createElement('div');

  let elementRef = new ElementRef(testElement);

  class Teste extends Renderer2 {
    listen;

    createComment = () => { };
    createText = () => { };
    data = () => { };
    destroy = () => { };
    insertBefore = () => { };
    nextSibling = () => { };
    parentNode = () => { };
    removeAttribute = () => { };
    removeChild = () => { };
    removeClass = () => { };
    removeStyle = () => { };
    selectRootElement = () => { };
    setAttribute = () => { };
    setProperty = () => { };
    setValue = () => { };

    addClass = (elm: HTMLElement, cls: string) => {

      elm.classList.add(cls);

    }

    createElement = (elm: string) => {

      return document.createElement(elm);

    }

    setStyle = (elm: HTMLElement, prop: string, val: any) => {

      elm.style[prop] = val;

    }

    appendChild = (elm: HTMLElement, chil: HTMLElement) => {

      elm.appendChild(chil);

    }
  }



  const rmock = new Teste();


  let directive = new RippleDirective(elementRef, rmock);





  beforeAll(() => {
    testElement.style.width = '100px';

    testElement.style.height = '90px';

    const rmock = new Teste();
  });



  beforeEach(() => {

    testElement.remove();

    testElement =
      document.createElement('div');

    elementRef =
      new ElementRef(testElement);

    directive =
      new RippleDirective(elementRef,
        rmock);

  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set element rippable', () => {
    expect(testElement.classList).toContain('ripple-container');
  });

  it('should create ripple inside element', () => {
    const e = new MouseEvent('mouseDown');

    testElement.addEventListener('mouseDown', (event) => {
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(e);

    expect(testElement.querySelectorAll('.prevent').length).toBeGreaterThanOrEqual(1);
    expect(testElement.querySelectorAll('.ripple').length).toBeGreaterThanOrEqual(1);
  });

  it('should delete ripple inside element onMouseUp', async () => {
    const down = new MouseEvent('mouseDown');
    const up = new MouseEvent('mouseup');

    testElement.addEventListener('mouseDown', (event) => {
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(down);

    testElement.querySelector('.prevent').addEventListener('mouseup', async (event) => {
     await directive.mouseUp(event)
        .then(result => {

          expect(result).toBe(null);

        }).catch(e => {

          expect(e).toBe(null);

        });

    });
    testElement.querySelector('.prevent').dispatchEvent(up);

  });

  it('should delete ripple inside element onMouseOut', async () => {
    const down = new MouseEvent('mouseDown');
    const out = new MouseEvent('mouseout');

    await testElement.addEventListener('mouseDown', (event) => {
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(down);

    await testElement.querySelector('.prevent').addEventListener('mouseout', async (event) => {
      await directive.mouseOut(event)
        .then(result => {

          expect(result).toBe(null);

        }).catch(e => {

          expect(e).toBe(null);

        });
    });

    testElement.querySelector('.prevent').dispatchEvent(out);

  });

});
