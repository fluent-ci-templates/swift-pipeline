use std::vec;

use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_swift;

pub mod helpers;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = setup_swift()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    setup_swift()?;
    let stdout = dag()
        .pipeline("build")?
        .with_exec(vec!["swift", "build", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    setup_swift()?;
    let stdout = dag()
        .pipeline("test")?
        .with_exec(vec!["swift", "test", &args])?
        .stdout()?;
    Ok(stdout)
}
