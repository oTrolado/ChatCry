import { FilterContactsPipe } from './filter-contacts.pipe';
import { transform } from '@babel/core';

let pipe: FilterContactsPipe;
let mock: Array<object> = [
  {nome:'nome 1', imagem:'', ultimoAcesso: new Date()},
  {nome:'nome 2', imagem:'', ultimoAcesso: new Date()},
  {nome:'nome 3', imagem:'', ultimoAcesso: new Date()},
  {nome:'nome 4', imagem:'', ultimoAcesso: new Date()},
  {nome:'Nome 1', imagem:'', ultimoAcesso: new Date()}
];

beforeEach(() => {
  pipe = new FilterContactsPipe();
});

describe('FilterContactsPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Teste se o pipe retorna o default sem argumentos', () => {
    expect(pipe.transform(mock)).toEqual(mock);
  });

  it('Teste se o pipe filtra o mock por nome', () => {
    expect(pipe.transform(mock, '1').length).toBe(2);

    expect(pipe.transform(mock, 'nome')).toEqual(mock);
  });
});
