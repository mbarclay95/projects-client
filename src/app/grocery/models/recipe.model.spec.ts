import { addRecipeToListMessage, normaliseRecipeUrl } from './recipe.model';

describe('addRecipeToListMessage', () => {
  it('pluralizes items added with none already on the list', () => {
    expect(addRecipeToListMessage({ added: 3, alreadyOnList: 0 })).toEqual('Added 3 items to the list.');
  });

  it('keeps a single item added singular', () => {
    expect(addRecipeToListMessage({ added: 1, alreadyOnList: 0 })).toEqual('Added 1 item to the list.');
  });

  it('appends how many were already on the list', () => {
    expect(addRecipeToListMessage({ added: 2, alreadyOnList: 1 })).toEqual('Added 2 items to the list. 1 was already on it.');
  });

  it('is a fixed sentence when everything was already on the list', () => {
    expect(addRecipeToListMessage({ added: 0, alreadyOnList: 4 })).toEqual('Everything was already on the list.');
  });

  it('is a fixed sentence when there was nothing to add', () => {
    expect(addRecipeToListMessage({ added: 0, alreadyOnList: 0 })).toEqual('Nothing to add.');
  });
});

describe('normaliseRecipeUrl', () => {
  it('is null for a blank url', () => {
    expect(normaliseRecipeUrl('   ')).toBeNull();
    expect(normaliseRecipeUrl(null)).toBeNull();
  });

  it('keeps an http or https url as typed, trimmed', () => {
    expect(normaliseRecipeUrl(' http://example.com/a ')).toEqual('http://example.com/a');
    expect(normaliseRecipeUrl('HTTPS://example.com')).toEqual('HTTPS://example.com');
  });

  it('prefixes https when no scheme was typed', () => {
    expect(normaliseRecipeUrl('example.com/tacos')).toEqual('https://example.com/tacos');
  });
});
