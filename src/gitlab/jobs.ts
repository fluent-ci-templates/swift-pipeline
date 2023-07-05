import { Job } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";

export const buildProject = (projectName: string, schemeName: string) =>
  new Job()
    .stage("build")
    .script(
      `
    xcodebuild clean -project ${projectName}.xcodeproj -scheme ${schemeName} | xcpretty
    xcodebuild test -project ${projectName}.xcodeproj -scheme ${schemeName} -destination 'platform=iOS Simulator,name=iPhone 8,OS=11.3' | xcpretty -s
  `
    )
    .tags(["ios_11-3", "xcode_9-3", "macos_10-13"]);

export const archiveProject = (
  projectName: string,
  schemeName: string,
  provisioningProfileName: string
) =>
  new Job()
    .stage("archive")
    .script(
      `
    xcodebuild clean archive -archivePath build/${projectName} -scheme ${schemeName}
    xcodebuild -exportArchive -exportFormat ipa -archivePath "build/${projectName}.xcarchive" -exportPath "build/${projectName}.ipa" -exportProvisioningProfile "${provisioningProfileName}"
  `
    )
    .rules([
      {
        if: "$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH",
      },
    ])
    .artifacts({
      paths: ["build/ProjectName.ipa"],
    })
    .tags(["ios_11-3", "xcode_9-3", "macos_10-13"]);
