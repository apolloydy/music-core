# Music Core

`Music Core` 是一个面向乐谱理解、转换、播放与识别的跨平台单体应用项目。

当前目标不是做一个普通音乐播放器，而是做一个围绕“谱子”运转的工具：

- 输入乐谱
- 解析和标准化乐谱数据
- 做记谱转换和调性处理
- 提供播放、同步和识别能力

当前仓库里已经有一个前端起步页，接下来会逐步演化成正式应用。

## 产品方向

目前确认的核心想法：

- 输入一个乐谱
- 五线谱和简谱之间转换
- 按照 12 平均律做半音升降处理
- 大调和小调转换
- 可选播放
- 听音乐后生成谱子
- 乐谱和音乐播放同步

补充要求：

- 输入支持 PDF
- 输入支持图片
- 输入支持标准乐谱编码
- 最好支持 OCR / OMR
- 不希望拆成传统前后端
- 希望最终是一个跨平台 app

## 产品判断

这个项目的底层不能只存 MIDI 音高，还要同时保留记谱语义。

原因：

- `C#` 和 `Db` 在 12 平均律下听起来一样，但在谱面里不是一回事
- 五线谱转简谱不能只靠频率，还要知道调号和唱名关系
- 升降半音时，既要改 sounding pitch，也要处理 spelling
- 大调小调转换要保留调性上下文，而不是只挪音高

所以内部数据模型至少要包含：

- sounding pitch：实际发声的音高
- pitch spelling：谱面拼写，如 `C#` / `Db`
- key / mode：调号和调式
- rhythm：时值、拍号、小节结构
- voice / part：声部和乐器
- notation context：连音、力度、歌词、和弦等

## 推荐架构

目前最合理的技术方向不是“前后端分离”，而是本地优先的单体跨平台应用。

建议：

- 外壳：`Tauri 2`
- UI：`React + TypeScript`
- 首版核心逻辑：TypeScript
- 后续重计算模块：可迁移到 Rust
- 数据策略：local-first
- 首版不依赖远程后端

这样做的原因：

- 一个代码仓库就能覆盖桌面端
- 可以保留前端开发效率
- 又能拿到本地文件、音频和系统能力
- 应用比 Electron 更轻
- 后续还能扩展到移动端

## 标准格式

### 主交换格式

首选 `MusicXML`。

理由：

- 它是开放的数字乐谱交换格式
- 被大量乐谱软件支持
- 适合在不同工具之间导入导出
- 五线谱生态成熟

### 其他格式

- `MEI`：表达能力更强，适合细粒度音乐编码和研究场景
- `ABC notation`：适合纯文本输入简单旋律，但不适合做唯一主格式
- `MIDI`：适合播放和音高事件交换，但不够表达完整谱面语义

### 建议

- 外部交换：优先 `MusicXML`
- 内部存储：不要直接拿 MusicXML 当数据库
- 内部应建立自己的 `Score IR`（中间表示）

## 内部数据模型建议

建议建立统一的 `Score IR`，大致包括：

- `Score`
- `Part`
- `Measure`
- `Voice`
- `Note`
- `Rest`
- `Pitch`
- `Duration`
- `KeySignature`
- `TimeSignature`
- `Lyric`
- `Chord`
- `SourceMapping`

`SourceMapping` 很关键，后面这些能力都会依赖它：

- OCR / OMR 结果校对
- 乐谱和播放同步高亮
- 音频转谱结果回填
- 页面坐标和符号的对应关系

## 功能拆分建议

### 第一阶段

- 导入 `MusicXML`
- 显示五线谱
- 做转调和升降半音
- 支持播放
- 导出 `MusicXML` / `MIDI`

### 第二阶段

- 导入 PDF / 图片
- 通过 OMR 转成 `MusicXML`
- 提供人工校对界面

### 第三阶段

- 增加简谱视图
- 做五线谱 <-> 简谱转换
- 做播放中的谱面同步

### 第四阶段

- 音频转谱
- 音频和乐谱时间对齐
- 局部纠错和编辑

## 开源库研究记录

### 乐谱渲染

- `OpenSheetMusicDisplay`
  - 优点：直接在浏览器里渲染 MusicXML，适合快速做五线谱界面
  - 优点：有 cursor API，适合做播放同步高亮
  - 站点：https://opensheetmusicdisplay.org/

- `VexFlow`
  - 优点：底层能力强，适合自定义记谱组件
  - 适合做复杂交互或局部渲染
  - 站点：https://www.vexflow.com/

- `Verovio`
  - 优点：渲染快，适合做 MEI / MusicXML 相关处理
  - 优点：自带 MIDI 输出和 timemap，适合做谱面同步
  - 站点：https://www.verovio.org

### PDF / 图片输入

- `PDF.js`
  - 用于解析和渲染 PDF 页面
  - 适合把 PDF 页变成后续 OMR 的输入
  - 站点：https://mozilla.github.io/pdf.js/

- `Audiveris`
  - 开源 OMR 工具
  - 能把扫描谱面转换为 MusicXML
  - 适合作为 PDF / 图片识谱链路的核心候选
  - 站点：https://audiveris.com/

### 播放与同步

- `Tone.js`
  - 浏览器侧音频调度成熟
  - 适合做播放、节拍控制和交互音频
  - 站点：https://tonejs.github.io/

- `Verovio MIDI / timemap`
  - 适合做谱面位置和播放时间的对齐
  - 有利于做“谱子和音乐同步”

### 听音出谱

- `Basic Pitch`
  - Spotify 开源的音频转 MIDI / note events 工具
  - 适合先做 v1 的自动扒谱能力
  - 有 Python 版本，也有 TypeScript 版本
  - 仓库：
    - https://github.com/spotify/basic-pitch
    - https://github.com/spotify/basic-pitch-ts

### OCR / 浏览器端模型推理

- `Tesseract`
  - 适合文字 OCR
  - 但普通 OCR 不是 OMR，不能直接替代乐谱识别

- `WebGPU`
  - 浏览器可以访问 GPU
  - 但要看浏览器和运行环境支持情况
  - 更适合作为模型加速选项，不适合做首版唯一依赖

- `ONNX Runtime Web`
  - 可以在浏览器里跑模型
  - 可选接入 WebGPU 做加速

## 当前技术判断

几个关键结论：

- 五线谱这部分优先借成熟生态，不要自己重复造轮子
- `MusicXML` 应该作为项目的主交换格式
- 简谱转换很可能是项目的核心差异化能力，需要自己做
- PDF / 图片导入本质上是 OMR，不是普通 OCR
- 音频转谱可以先接现成模型，不建议首版自己训
- GPU 可以利用，但首版应该先保证 CPU / WASM 路线可跑通

## 当前实现状态

当前仓库是一个启动版本，包含：

- React
- Vite
- TypeScript
- 一个项目起步页

## 本地启动

```bash
npm install
npm run dev
```

默认开发地址可以使用：

```bash
http://127.0.0.1:3001
```

## 下一步建议

建议按这个顺序推进：

1. 先把 README 里的产品范围固定住
2. 定义 `Score IR`
3. 接入 `MusicXML` 导入和五线谱渲染
4. 先做半音转换、转调、播放
5. 再进入 PDF / 图片识谱和简谱转换
