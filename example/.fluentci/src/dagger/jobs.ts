import Client from "@fluentci.io/dagger";

export enum Job {
  test = "test",
  build = "build",
}

const SWIFT_VERSION = Deno.env.get("SWIFT_VERSION") || "5.8";

export const exclude = [".git", ".build", ".fluentci"];

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const ctr = client
    .pipeline(Job.test)
    .container()
    .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
    .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["swift", "test"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const build = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const ctr = client
    .pipeline(Job.build)
    .container()
    .from(`swiftlang/swift:nightly-${SWIFT_VERSION}-jammy`)
    .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["swift", "build"]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (
  client: Client,
  src?: string
) =>
  | Promise<void>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<void>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.build]: build,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run tests",
  [Job.build]: "Build the project",
};
