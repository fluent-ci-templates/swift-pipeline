use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_swift() -> Result<String, Error> {
    let path = dag().get_env("PATH")?;

    dag().set_envs(vec![(
        "PATH".into(),
        format!("/home/linuxbrew/.linuxbrew/bin:{}", path),
    )])?;

    let stdout = dag()
        .pipeline("setup")?
        .with_exec(vec![r#"type brew > /dev/null || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)""#])?
        .with_exec(vec!["type swift > /dev/null || brew install swift"])?
        .stdout()?;
    Ok(stdout)
}
