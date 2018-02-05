import { Payload } from "almin";

export default class FetchCompletePayload extends Payload {
  type = "fetch-complete"

  constructor(value) {
    super();
    this.value = value;
  }
}
