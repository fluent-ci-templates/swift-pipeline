# Swift Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fswift_pipeline&query=%24.version)](https://pkg.fluentci.io/swift_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/swift-pipeline)](https://codecov.io/gh/fluent-ci-templates/swift-pipeline)

A ready-to-use Pipeline for your [Swift](https://www.swift.org/) projects.

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run swift_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t swift
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
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
import { test, build } from "https://pkg.fluentci.io/swift_pipeline@v0.4.0/mod.ts";

await test();
await build();
```
