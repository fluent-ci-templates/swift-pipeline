# Swift Pipeline

[![deno module](https://shield.deno.dev/x/swift_pipeline)](https://deno.land/x/swift_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/swift-pipeline)](https://codecov.io/gh/fluent-ci-templates/swift-pipeline)

A ready-to-use Pipeline for your [Swift](https://www.swift.org/) projects.

## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci swift_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t swift
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Environment variables

| Variable        | Description                                    |
| --------------- | ---------------------------------------------- |
| `SWIFT_VERSION` | The version of Swift to use. Defaults to `5.8` |

## Jobs

| Job       | Description   |
| --------- | ------------- |
| test      | Run tests     |
| build     | Build project |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://deno.land/x/swift_pipeline/mod.ts";

const { test, build } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await test(client, src);
    await build(client, src);
  });
}

pipeline();
```
