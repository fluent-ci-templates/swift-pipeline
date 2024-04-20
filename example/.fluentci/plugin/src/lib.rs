use std::vec;

use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_swift;

pub mod helpers;

#[plugin_fn]
pub fn setup(version: String) -> FnResult<String> {
    let stdout = setup_swift(version)?;
    Ok(stdout)
}

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    let mut version = dag().get_env("SWIFT_VERSION").unwrap_or_default();
    if version.is_empty() {
        version = "5.8".into();
    }

    setup_swift(version)?;
    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- swift build", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let mut version = dag().get_env("SWIFT_VERSION").unwrap_or_default();
    if version.is_empty() {
        version = "5.8".into();
    }

    setup_swift(version)?;
    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- swift test", &args])?
        .stdout()?;
    Ok(stdout)
}
