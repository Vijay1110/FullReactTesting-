import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "Fetched #1" }, { name: "Fetched #2" }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and display them", done => {
  // Attempt to render the *entire* app
  const Wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComment' button and click it
  Wrapped.find(".fetch-comments").simulate("click");

  // introduce a TINY little pause

  moxios.wait(() => {
    //force Update
    Wrapped.update();

    // Expect to find the list of comments! 500 Li's
    expect(Wrapped.find("li").length).toEqual(2);

    done();
    Wrapped.unmount();
  });

  // setTimeout(() => {
  //   //force Update
  //   Wrapped.update();

  //   // Expect to find the list of comments! 500 Li's
  //   expect(Wrapped.find("li").length).toEqual(2);

  //   done();
  //   Wrapped.unmount();
  // }, 100);
});
