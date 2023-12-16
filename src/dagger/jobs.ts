import { Client, Directory } from "../../sdk/client.gen.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  build = "build",
}

const SWIFT_VERSION = Deno.env.get("SWIFT_VERSION") || "5.8";

export const exclude = [".git", ".build", ".fluentci"];

/**
 * @function
 * @description Run tests
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function test(
  src: Directory | string | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

    const ctr = client
      .pipeline(Job.test)
      .container()
      .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
      .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["swift", "test"]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Build the project
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function build(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

    const ctr = client
      .pipeline(Job.build)
      .container()
      .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
      .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["swift", "build"])
      .withExec(["cp", "-r", ".build", "/"]);

    await ctr.stdout();
    id = await ctr.directory("/.build").id();
  });
  return id;
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
