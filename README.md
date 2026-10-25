# vscode-color-themes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

*他の言語で読む(Read this in other languages):* [![🇯🇵 日本語](https://img.shields.io/badge/%F0%9F%87%AF%F0%9F%87%B5-日本語-white)](./README.ja.md) [![🇺🇸 English](https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8-English-white)](./README.md)

## Overview

A collection of VS Code color themes for personal use, comparison, and inspiration.

Each theme is a `.code-workspace` file that defines `workbench.colorCustomizations` (UI colors) and `editor.tokenColorCustomizations` (syntax highlighting colors). Nothing needs to be installed from the Marketplace: open the workspace file and the theme is applied to that window only. Your global settings and your project's `.vscode/settings.json` stay untouched.

The [`examples/`](./examples/) directory has sample source code and text files for each language, so you can see how a theme looks before using it.

## Themes

| Theme | Style | Description | Screenshot |
| --- | --- | --- | --- |
| [aws-theme](./themes/aws-theme/) | Dark | Inspired by the AWS Management Console. Navy UI with orange accents. | <img src="./themes/aws-theme/screenshot.png" alt="aws-theme" width="320"> |
| [cockpit-hud](./themes/cockpit-hud/) | Dark | Inspired by an all-round monitor cockpit. Deep space background with cyan HUD lines and green/amber accents. | <img src="./themes/cockpit-hud/screenshot.png" alt="cockpit-hud" width="320"> |

See the `README.md` in each theme directory for its color palette and usage.

## Repository Structure

```text
vscode-color-themes/
├── themes/                          # One directory per theme
│   └── <theme-name>/
│       ├── README.md                # Theme description, palette, and usage
│       ├── <theme-name>.code-workspace
│       └── screenshot.png           # Preview image
├── examples/                        # Sample files for checking colors
│   ├── README.md
│   ├── sample.ts
│   ├── sample.py
│   └── ...
├── LICENSE
├── README.md
└── README.ja.md
```

## Usage

### Apply a theme to a project

1. Copy `themes/<theme-name>/<theme-name>.code-workspace` to the root of your project.
2. Open it with **File > Open Workspace from File...** (or double-click it).
3. The theme is applied to that window. To go back to your usual theme, open the project folder directly instead of the workspace file.

The workspace file contains `"folders": [{ "path": "." }]`, so it opens the folder the file is placed in.

### Other ways to apply

- **Profiles**: Create a profile (**Profiles: Create Profile**) and copy the contents of the `settings` block from the workspace file into the profile's `settings.json`. You can switch themes by switching profiles.
- **User settings**: Copy the `settings` block into your user `settings.json` to use the theme everywhere.

> [!TIP]
> These themes override colors on top of the color theme that is currently selected (`workbench.colorTheme`). Any token or UI color a theme does not define falls back to the base theme. For dark themes, use a dark base theme such as **Dark Modern**.

## Previewing with Examples

1. Open `themes/<theme-name>/<theme-name>.code-workspace` in VS Code.
2. Use **File > Open File...** to open files in [`examples/`](./examples/).

Workspace color settings apply to the whole window, so files outside the workspace folder are also shown in the theme's colors. To compare themes, open each workspace in its own window and view the same sample file side by side.

## Adding a Theme

### Steps

1. Create `themes/<theme-name>/`. Use kebab-case for the directory name.
2. Add `<theme-name>.code-workspace` with `"folders": [{ "path": "." }]`, and put the color settings under `settings`.
3. Add a `README.md` (see [Theme README](#theme-readme)).
4. Open the files in `examples/` and check the colors. If a language is missing, add a sample for it.
5. Take a screenshot and save it as `screenshot.png` (see [Screenshot](#screenshot)).
6. Add the theme to the **Themes** table in both `README.md` and `README.ja.md`.

### Rules

#### Base theme

Do not set `workbench.colorTheme` in the workspace file. Write the recommended base theme (for example, **Dark Modern**) in the theme's README instead, so that users keep control of their own base theme.

#### Required colors

Define at least the following, so that the look does not depend on the base theme:

- **UI** (`workbench.colorCustomizations`): editor background and foreground, line numbers, cursor, selection, current line highlight (`editor.lineHighlightBackground` and `editor.lineHighlightBorder`), word highlight, bracket pair colors (`editorBracketHighlight.*`), indent guides, widgets (suggest and hover), side bar, activity bar, title bar, status bar, tabs, panel, and terminal (background, foreground, and all 16 ANSI colors)
- **Tokens** (`editor.tokenColorCustomizations`): comment, string, number, constant, keyword, operator, function, class/type, variable, parameter, and property. Also set `fontStyle` explicitly (use `""` for none), so that italics and underlines from the base theme do not show through. When the base theme uses a more specific scope (such as `variable.parameter` or `support.type.primitive`), its rule wins, so list those scopes too.

#### Contrast

Check the contrast ratio against the editor background:

- Foreground and main tokens (keyword, function, type, variable, and so on): **4.5:1 or higher** as a target (WCAG AA)
- Colors meant to stay in the background (comments, line numbers, inactive items): **3:1 or higher**

#### Theme README

Each theme's `README.md` has these sections:

1. Overview: the concept and the style (dark or light)
2. Screenshot
3. Color palette: a table of the main colors and where they are used
4. Recommended base theme
5. How to apply
6. How to check the colors with `examples/`

[themes/aws-theme/README.md](./themes/aws-theme/README.md) can be used as a template.

#### Screenshot

- File: `themes/<theme-name>/screenshot.png`
- Content: [`examples/sample.ts`](./examples/sample.ts) opened, with the title bar, activity bar, side bar (Explorer), tabs, and status bar visible. The terminal panel is optional.
- Size: full screen (1280×800 px or larger)
- Do not include personal information such as user names or local paths (for example, in the terminal prompt)

To hide the file path shown in the breadcrumbs above the editor, turn off breadcrumbs while you take the screenshot:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **View: Toggle Breadcrumbs**. You can also set `"breadcrumbs.enabled": false` in `settings.json`.
2. Take the screenshot.
3. Run **View: Toggle Breadcrumbs** again (or remove the setting) to show the breadcrumbs again.

## License

[MIT License](./LICENSE)
