import BlogState from "./BlogState.js";
import { Store } from "almin";

class AcquireState {
}

export default class BlogStore extends Store {
  constructor() {
    super();
    //this.state = new BlogState({ page: 1, entries: [] });
    this.state = new BlogState();
  }

  getState() {
    return this.state;
  }

  receivePayload(payload) {
    switch (payload.type) {
      case "fetch-complete":
        const newState = new BlogState({ page: 1, entries: payload.value });
        this.setState(newState);

        /*
        fetch("/page1.json").then(async (response) => {
          const entries = await response.json();
          const newState = new BlogState({ page: 1, entries });
          this.setState(newState);
        });
        */
    }
  }
}
