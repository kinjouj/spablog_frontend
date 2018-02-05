export default class BlogState {
  constructor({ page = 1, entries = []} = {}) {
    this.page = page;
    this.entries = entries;
  }
}
