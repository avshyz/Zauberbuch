// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let config_dir = app.path_resolver().app_config_dir().unwrap();
            if !fs::metadata(&config_dir).is_ok() {
                fs::create_dir_all(&config_dir).unwrap();
                println!("Creating config dir at {:?}", &config_dir.display());
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
