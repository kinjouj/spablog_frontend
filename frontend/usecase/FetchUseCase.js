import { UseCase } from "almin";
import FetchCompletePayload from "../payload/FetchCompletePayload.js";

export default class FetchUseCase extends UseCase {
  execute() {
    return fetch("/page1.json").then(async response => {
      const entries = await response.json();
      return entries;
    }).then(value => {
      this.dispatch(new FetchCompletePayload(value));
    });
  }
}
