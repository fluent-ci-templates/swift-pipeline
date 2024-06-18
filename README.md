# Swift Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/swift_pipeline)](https://pkg.fluentci.io/swift_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.42)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/swift)](https://jsr.io/@fluentci/swift)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/swift-pipeline)](https://codecov.io/gh/fluent-ci-templates/swift-pipeline)
[![ci](https://github.com/fluent-ci-templates/swift-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/swift-pipeline/actions/workflows/ci.yml)

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

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/swift-pipeline@main
```

Call a function from the module:

```bash
dagger -m github.com/fluent-ci-templates/swift-pipeline@main call \
  test --src .

dagger -m github.com/fluent-ci-templates/swift-pipeline@main call \
  build --src .
```

## 🛠️ Environment variables

| Variable        | Description                                    |
| --------------- | ---------------------------------------------- |
| `SWIFT_VERSION` | The version of Swift to use. Defaults to `5.8` |

## ✨ Jobs

| Job       | Description   |
| --------- | ------------- |
| test      | Run tests     |
| build     | Build project |

```typescript
build(
  src: Directory | string | undefined = "."
): Promise<Directory | string>
test(
  src: Directory | string | undefined = "."
): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { test, build } from "jsr:@fluentci/swift";

await test();
await build();
```
