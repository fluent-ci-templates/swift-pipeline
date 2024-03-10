# Swift Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fswift_pipeline&query=%24.version)](https://pkg.fluentci.io/swift_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF&labelColor=000000)](https://dagger.io)
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
