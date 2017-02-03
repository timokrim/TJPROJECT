import { TJPROJECTPage } from './app.po';

describe('tjproject App', function() {
  let page: TJPROJECTPage;

  beforeEach(() => {
    page = new TJPROJECTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
