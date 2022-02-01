import app from "../src/app";

export function build() {
  let testApp = app();

  beforeAll(async () => {
    testApp = app();
    await testApp.ready();
  });

  afterAll(() => testApp.close());

  return testApp;
}
