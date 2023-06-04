// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let config_dir = app.path_resolver().app_config_dir().unwrap();

            assert_dir_exists(&config_dir);
            assert_dir_exists(&config_dir.join("characters"));
            assert_dir_exists(&config_dir.join("spells"));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn assert_dir_exists(path: &std::path::PathBuf) {
    if !path.exists() {
        fs::create_dir_all(&path).unwrap();
        println!("Creating config dir at {:?}", &path.display());
    }
}
