---
title: "[OhMyQt 系列] 01_HelloWorld"
date: 2021-07-20T10:58:40+08:00
image: preview2.png
categories:
  - Tutorial
tags:
  - Qt
  - QML
draft: false
---

## 前言
> 项目地址: [axionl/OhMyQt](https://github.com/axionl/OhMyQt)

- 项目在 Windows 11 和 ArchLinux 下进行测试
- Qt 版本: 5.15.2

本文以项目构建的角度介绍一个简单 Qt 应用的开发，其余具体的环境安装和配置稍后会在第 0 节内容中放出。

## 从看见到设计

我们需要一个简单的展示页面作为上手的第一个项目：

- 一个醒目的标题
- 一段用于描述的文字
- 还有一个好看的背景

假设我们已经做了出来，它长下面这个样子，你需要做的是把它保留在你的想象中，我们再回过头来考虑如何实现。

![preview](preview.png)

### 布局

我们把窗口想象成一个盒子（而不是一个平面或者一张桌子，因为盒子横看有四壁，俯瞰有纵深），而所需要填入的内容当成另一个小些的盒子，套入到窗口这个大盒子中。结合我们多年糊 PPT 的水平，可以对界面有如下设计要求：

- 内容整体居中
- 标题和描述上下排布
- 内容之间最好有一定的间距

![layout](layout.png)

如上图所示，我们把这一些要求的集合称为 “布局” 也即 Layout，它决定了我们软件设计的基本框架。上面的每一项具体内容称为 “元素” 即 Element / Item。有的人设计 PPT 的时候会说：“应甲方要求，标题一定要大！”，那这属于元素的“属性”，即 Property。于是我们来抽象实现一下这个布局（**注意不是直接能用的代码**）：

```qml
// 基本元素如下
Window {                // 窗口一个大盒子
    Box {               // 里面套个小盒子
        Title {}        // 盒子里面有标题
        Description {}  // 标题下面有描述
    }
}
```

进一步加上居中对齐和间距：

```qml
Window {
    Box {
        anchors.centerIn: parent // 居中对齐大盒子

        Title {
            anchors.horizontalCenter: parent.horizontalCenter // 水平对齐小盒子
        }

        Description {
            anchors.horizontalCenter: parent.horizontalCenter // 水平对齐小盒子
        }
    }
}
```

可以看到，这里引用了一个 `parent` 的概念，实际上指代上一层父级元素，套娃套在里面的才是娃，文字和描述的父级元素是小盒子，小盒子的父级元素是大窗口。再补上元素的属性和间距：

```qml
Window {
    width: 960 // 窗口宽度
    height: 720  // 窗口高度

    Box {
        anchors.centerIn: parent
        implicitWidth: 360 // 宽度 360 单位（多数情况下理解为像素）
        implicitHeight: 128 // 高度 128 单位

        Title {
            anchors.horizontalCenter: parent.horizontalCenter // 水平对齐小盒子
            font.pixelSize: 24 // 标题一定要大
        }

        Box {
            visible: false      // 一个看不见的盒子
            implicitHeight: 16  // 用于拉开标题和描述的间距
        }

        Description {
            anchors.horizontalCenter: parent.horizontalCenter // 水平对齐小盒子
            font.pixelSize: 16 // 精致的描述用小字
        }
    }
}
```

这些具体元素我们以后会写到如何实现，现在需要用 `QtQuick.Controls` 提供的一些默认元素替代：

- Box->Rectangle
- Title / Description -> Text

```qml
import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.12

Window {
    width: 960
    height: 720

    Rectangle {
        anchors.centerIn: parent
        implicitWidth: 360
        implicitHeight: 128
        color: "#ef7e9ceb"

        Text {
            id: title
            anchors.horizontalCenter: parent.horizontalCenter
            text: "这是一个大标题"
            font.pixelSize: 48
        }

        Rectangle {
            color: "transparent"
            implicitHeight: 16
        }

        Text {
            id: description
            anchors.horizontalCenter: parent.horizontalCenter
            text: "我吞下玻璃会伤身体"
            font.pixelSize: 24
        }
    }
}
```

实现之后的效果可能长成了这个样子，对了，但没全对。因为我们这个 `Rectangle` 不太智能，是个“硬盒”，元素之间会挤在一起，而不是自动拉开保持社交距离。

![awesome_qml](awesome_qml.png)

```qml
import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.12
import QtQuick.Layouts 1.12

Window {
    width: 960
    height: 720

    Rectangle {
        anchors.centerIn: parent
        implicitWidth: 360
        implicitHeight: 128
        color: "#ef7e9ceb"

        ColumnLayout { // 一个上下布局的模板
            anchors.fill: parent // 沾满小盒子的空间
            spacing: 16 // 原先看不见的盒子用默认提供的间距属性实现

            Text {
                id: title
                anchors.horizontalCenter: parent.horizontalCenter
                text: "这是一个大标题"
                font.pixelSize: 48
            }

            Text {
                id: description
                anchors.horizontalCenter: parent.horizontalCenter
                text: "我吞下玻璃会伤身体"
                font.pixelSize: 24
            }
        }
    }
}
```

可以把 `ColumnLayout` 当作一个更加智能的盒子，它能够把挤在一起的元素上下依次排开。而与之相对的 `RowLayout` 则是将元素左右排开。

![column_layout](column_layout.png)

对比原本想像中的布局要求，可以说是基本实现了(~~打个九折不过分吧~~)。