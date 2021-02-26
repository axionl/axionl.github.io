---
title: "[归档] Hello, My Firefox"
date: 2021-01-27T16:24:43+08:00
image: https://w.wallhaven.cc/full/eo/wallhaven-eo5jko.png
draft: false
categories:
  - Customize
tags:
  - Browser
---

> 自用配置项，持续更新中......

## 选项

- 允许加载用户样式文件（userChrome.css）

```ini
toolkit.legacyUserProfileCustomizations.stylesheets = true
```

- 调整浏览器标签宽度

```ini
browser.tabs.tabClipWidth = 83
```

- 硬件加速

```ini
media.ffmpeg.vaapi.enabled = true
media.ffvpx.enabled = false
```

配合系统环境变量使用 `MOZ_X11_EGL=1` 或 `MOZ_ENABLE_WAYLAND=1`，`MOZ_WEBRENDER=1`

- Devtools

```ini
devtools.editor.tabsize = 4
devtools.debugger.remote-enabled = true
```

DevTools 中还有 `Enable browser chrome and add-on debugging toolboxes` 可以打开，调试扩展常用选项

- 易用模式

```ini
accessibility.typeaheadfind.enablesound = false
```

默认开了这个选项，导致 Ctrl+F 搜索不到结果的时候笔记本的蜂鸣器会吼得很大声

## 主题

![MaterialFox Preview](https://user-images.githubusercontent.com/5405629/45172944-21d91900-b24a-11e8-8bc5-03814121b0de.png)

> [MaterialFox](https://github.com/muckSponge/MaterialFox)

## 扩展

- [Tree Style Tab](https://addons.mozilla.org/en-US/firefox/addon/tree-style-tab)

  ![TST Preview](preview.png)

  - userChrome.css 外部配置 [treestyletab.css](https://github.com/axionl/dotfiles/blob/14ARE/private_dot_mozilla/csstheme/TreeStyleTab/treestyletab.css)

  - 插件内嵌样式配置 [custom.css](https://github.com/axionl/dotfiles/blob/14ARE/private_dot_mozilla/csstheme/TreeStyleTab/custom.css)

  - 调试插件样式的方法

    1. ![Debug Add-ons](debug_add_ons.png)
    2. ![Debug Runtime](debug_runtime.png)
    3. ![Debug TST Page](debug_tst_page.png)
    4. ![Debug TST](debug_tst.png)

- [TST Bookmarks Subpanel](https://addons.mozilla.org/en-US/firefox/addon/tst-bookmarks-subpanel)

  ![TST Bookmarks Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/220/220713.png)

- [SwitchyOmega](https://addons.mozilla.org/en-US/firefox/addon/switchyomega)

  ![SwitchyOmega Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/183/183855.png)

- [Auto Tab Discard](https://addons.mozilla.org/zh-CN/firefox/addon/auto-tab-discard)

- [Keepassxc Browser](https://addons.mozilla.org/en-US/firefox/addon/keepassxc-browser)

![Keepassxc Browser Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/234/234592.png)

- [Plasma Integration](https://addons.mozilla.org/en-US/firefox/addon/plasma-integration)

![Plasma Integration Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/202/202551.png)

- [Saladict](https://addons.mozilla.org/en-US/firefox/addon/ext-saladict)

  ![Saladict Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/203/203286.png)

- [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)

  ![Tampermonkey Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/170/170870.png)

  - 一个用于 [ArchWiki 目录](https://github.com/axionl/dotfiles/blob/14ARE/private_dot_mozilla/csstheme/Tampermonkey/archwiki.js) 侧边显示的脚本

  ![ArchWiki TOC](archwiki.png)

- [User-Agent Switcher and Manager](https://addons.mozilla.org/en-US/firefox/addon/user-agent-string-switcher)

  ![User-Agent Switcher and Manager Preview](https://addons.cdn.mozilla.net/user-media/previews/thumbs/188/188200.png)
