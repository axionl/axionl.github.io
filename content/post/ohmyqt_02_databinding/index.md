---
title: "[OhMyQt 系列] 02_DataBinding"
date: 2021-09-20T10:27:36+08:00
image: banner.png
categories:
  - Tutorial
tags:
  - Qt
  - QML
draft: true
---

## 前言
> 项目地址: [axionl/OhMyQt](https://github.com/axionl/OhMyQt)

- 项目在 ArchLinux 下进行测试
- Qt 版本: 6.2.0rc-1

数据绑定，在这里称为属性绑定，是将用户交互界面的动态输入内容传递到后端进行处理，并将结果在界面上输出。Qt 提供了多种不同的方案来实现这一过程，也因所对应的后端语言各异而有所不同。

在这个 Demo 中，我们需要实现绑定的对象及事件有如下几个
- 输入的链接
- 点击开始下载按钮
- 下载进度
- 下载文件路径

![preview](preview.png)
## 数据绑定

### 来自其他对象的属性

```qml
Label {
    id: text1
    color: "#3e3e3e"
}

Label {
    id: text2
    color: text1.color
}
```

上面是一个简单的例子，id 为 `text2` 的 `Label` 使用与 `text1` 相同的颜色，且当 `text1` 的颜色发生变化的时候 `text2` 的颜色也会随之改变。一般为了看的更清晰，常在二者的上级对象中声明一个公共属性。

```qml
Item {
    property string textColor: "#3e3e3e"

    Label {
        id: text1
        color: textColor
    }

    Label {
        id: text2
        color: textColor
    }
}
```

且同样会随着这个公共属性变化而改变现有对象的属性。还注意到，如果是同一层级的对象，调用属性的时候需要指定对象 id，而在父对象中的属性则可以直接使用，也可以指定父对象的 id。

### 从 JavaScript 绑定

### C++ 绑定


## 属性背后的 QMetaObject

## 其他语言 (ToDo)
### Python
### ...

## 小结