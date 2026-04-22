# Score IR Draft

`Score IR` 是 `Music Core` 内部统一使用的乐谱中间表示。

它不直接等同于 `MusicXML`、`MIDI`、`MEI` 或简谱文本，而是项目内部的标准数据层。

## 目标

`Score IR` 需要同时服务这些场景：

- 导入 `MusicXML`
- 从 PDF / 图片 OMR 结果回填
- 支持五线谱和简谱的双向转换
- 支持升降半音、转调、大小调转换
- 支持播放和谱面高亮同步
- 为后续音频转谱提供统一落点

## 设计原则

### 1. 分离 sounding pitch 和 spelling

同一个音高在 12 平均律下可能有不同写法，例如：

- `C#4`
- `Db4`

这两个音听起来一样，但在谱面处理里不能混为一谈。

所以 `Score IR` 里需要同时保存：

- 实际音高
- 记谱拼写

### 2. 保留上下文

单个音符不能脱离上下文理解，至少要保留：

- 调号
- 调式
- 拍号
- 小节
- 声部
- 连音和表情记号

### 3. 面向转换而不是面向单一格式

内部模型要能承接多种输入，再输出到多种目标：

- 输入：MusicXML、OMR、音频转 note events、手动输入
- 输出：五线谱、简谱、MusicXML、MIDI、播放事件流

### 4. 保留源映射

需要能追踪“这个内部音符来自哪里”，这样后续才能做：

- OMR 校对
- 播放同步高亮
- 局部编辑
- 错误回溯

## 核心对象

推荐的对象层级：

1. `Score`
2. `Part`
3. `Measure`
4. `Voice`
5. `Event`
6. `Note` / `Rest`

其中 `Event` 是时间轴上的统一节点，后面还可以扩展：

- barline
- tempo
- direction
- harmony
- lyric anchor

## 最小字段建议

### Score

- `id`
- `title`
- `composer`
- `parts`
- `metadata`
- `source`

### Part

- `id`
- `name`
- `instrument`
- `measures`
- `clefPlan`
- `transposition`

### Measure

- `index`
- `number`
- `timeSignature`
- `keySignature`
- `voices`
- `directions`
- `layout`

### Voice

- `id`
- `events`

### Note

- `id`
- `pitch`
- `duration`
- `ties`
- `articulations`
- `lyrics`
- `sourceRange`

### Rest

- `id`
- `duration`
- `sourceRange`

## Pitch 模型建议

`Pitch` 至少要包含：

- `step`：`A` 到 `G`
- `alter`：升降号偏移，例如 `-1`、`0`、`1`
- `octave`
- `midi`
- `concertMidi`
- `spelling`

解释：

- `midi` 用于播放和音高计算
- `concertMidi` 用于移调乐器的统一处理
- `spelling` 用于保持谱面写法

## Duration 模型建议

时值不能只存秒数，建议同时保留：

- `divisionUnits`
- `beats`
- `seconds`
- `notated`

原因：

- 乐谱编辑更依赖 notated duration
- 播放和同步更依赖时间轴秒数
- 导入导出时常常需要 division-based 表达

## 调号与调式

建议区分：

- `KeySignature`：谱面上显示几个升号或降号
- `Mode`：大调、小调、教会调式等
- `TonalCenter`：主音中心

因为：

- 同一个调号不一定对应同一个调式理解
- 大调小调转换不能只改 accidental 数量

## 简谱支持策略

简谱不要作为底层唯一模型，而应该作为一种视图或导出表示。

原因：

- 简谱高度依赖当前调的唱名体系
- 同一实际音高在不同调里数字不同
- 五线谱、MusicXML、播放事件都不适合直接建立在简谱数字上

建议：

- 底层统一用 `Score IR`
- 简谱层按当前 `tonal center` 计算数字唱名
- 升降记号、时值线、附点、八度点作为渲染逻辑处理

## Source Mapping

这是后续能力的关键字段。

建议每个可编辑对象都保留：

- 来源类型：`musicxml` / `omr` / `audio` / `manual`
- 来源位置
- 页面坐标
- 原始片段 id
- 置信度

典型用途：

- PDF 校对时，点击页面高亮音符
- 播放时，定位到谱面符号
- 音频转谱结果和人工修订结果并存

## v1 范围

第一版 `Score IR` 先支持：

- 单谱面
- 多声部
- 五线谱常见音符和休止符
- 调号 / 拍号 / 速度
- tie / slur 的基础描述
- lyrics 的简单挂载

先不做过重内容：

- 极复杂排版
- 古谱 / 特殊记谱法
- 完整和声分析
- 完整教会调式系统

## 实现建议

### v1

- 先在 TypeScript 里定义类型
- 写 `MusicXML -> Score IR` 适配层
- 写 `Score IR -> playback events` 适配层

### v2

- 把转调、半音升级、大小调转换沉淀成纯函数
- 加 `Score IR -> Jianpu ViewModel`

### v3

- 加入 OMR / 音频转谱 source mapping
- 视情况把重计算部分迁到 Rust

