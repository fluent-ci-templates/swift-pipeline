import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import { archiveProject, buildProject } from "./jobs.ts";

const gitlabci = new GitlabCI()
  .addJob("build_project", buildProject("ProjectName", "SchemeName"))
  .addJob(
    "archive_project",
    archiveProject("ProjectName", "SchemeName", "ProvisioningProfileName")
  );

export default gitlabci;
