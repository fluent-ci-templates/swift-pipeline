import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";

export enum Job {
  test = "test",
  build = "build",
}

const SWIFT_VERSION = Deno.env.get("SWIFT_VERSION") || "5.8";

const exclude = [".git", ".build", ".fluentci"];

const baseCtr = (client: Client, pipeline: string) =>
  withDevbox(
    client
      .pipeline(pipeline)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  ).withExec(["devbox", "global", "add", `swift@${SWIFT_VERSION}`]);

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const ctr = baseCtr(client, Job.test)
    .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["sh", "-c", `eval "$(devbox global shellenv)" && swift test`]);

  const result = await ctr.stdout();

  console.log(result);
};

export const build = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const ctr = baseCtr(client, Job.test)
    .withMountedCache("/app/.build", client.cacheVolume("swift-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["sh", "-c", `eval "$(devbox global shellenv)" && swift build`]);

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
