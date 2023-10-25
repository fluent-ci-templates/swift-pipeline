import {
  test,
  build,
} from "https://pkg.fluentci.io/swift_pipeline@v0.4.1/mod.ts";

await test();
await build();
