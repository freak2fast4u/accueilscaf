import { AccueilscafPage } from './app.po';

describe('accueilscaf App', () => {
  let page: AccueilscafPage;

  beforeEach(() => {
    page = new AccueilscafPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
