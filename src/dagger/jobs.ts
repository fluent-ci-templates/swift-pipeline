/**
 * @module swift
 * @description This module provides a set of functions for working with Swift projects.
 */
import { dag, env, Directory } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  build = "build",
}

const SWIFT_VERSION = env.get("SWIFT_VERSION") || "5.8";

export const exclude = [".git", ".build", ".fluentci"];

/**
 * Run tests
 *
 * @function
 * @description Run tests
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function test(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.test)
    .container()
    .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
    .withMountedCache("/app/.build", dag.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["swift", "test"]);

  return ctr.stdout();
}

/**
 * Build the project
 *
 * @function
 * @description Build the project
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function build(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.build)
    .container()
    .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
    .withMountedCache("/app/.build", dag.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["swift", "build"])
    .withExec(["cp", "-r", ".build", "/"]);

  await ctr.stdout();
  return ctr.directory("/.build").id();
}

export type JobExec = (
  src: Directory | string | undefined
) => Promise<Directory | string> | Directory | string;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.build]: build,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run tests",
  [Job.build]: "Build the project",
};
