use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_swift(version: String) -> Result<String, Error> {
    let mut version = version;
    if version.is_empty() {
        version = "5.8".into();
    }

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["[ -f  devbox.json ] || devbox init"])?
        .with_exec(vec![&format!(
            "grep -q 'swift' devbox.json || devbox add swift@{}",
            version
        )])?
        .stdout()?;
    Ok(stdout)
}
