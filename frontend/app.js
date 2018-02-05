"use strict";

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { AlminLogger } from "almin-logger";
import { Context, Dispatcher, StoreGroup } from "almin";
//import AlminReactContainer from "almin-react-container";
import AppLocator from "./AppLocator.js";
import App from "./component/App.js";
import BlogStore from "./store/BlogStore.js";
import FetchUseCase from "./usecase/FetchUseCase.js";

let storeGroup = new StoreGroup({
  blog: new BlogStore()
});

const appContext = new Context({
  dispatcher: new Dispatcher(),
  store: storeGroup,
  options: { strict: true }
});
AppLocator.context = appContext;

const logger = new AlminLogger();
logger.startLogging(appContext);

(async function bootApp() {
  /*
  await appContext.transaction("bootstrap", async transactionContext => {
    await transactionContext.useCase(new FetchUseCase()).execute();
    transactionContext.commit();
  });
  const Bootstrap = AlminReactContainer.create(App, AppLocator.context);
  ReactDOM.render(<Bootstrap />, document.querySelector("#content"));
  */

  appContext
    .useCase(new FetchUseCase())
    .execute()
    .then(() => {
      ReactDOM.render(<App appContext={appContext} />, document.querySelector("#content"));
    });

  //ReactDOM.render(<App appContext={appContext} />, document.querySelector("#content"));
})();
