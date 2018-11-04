### compiler@0.1.0

徐烨<!-- .element: style="text-align: right; margin-right: 150px; font-size: 20px; color: #999;" -->

Note:

- 前端交互技术组
  - 大众 PK
  - 小程序/Vue/快应用/百度小程序/阿里小程序等转换框架
- 如何用 JavaScript 实现编译器

----

### Condition Evaluator

```json
[
  {
    "condition": "{{pageName}} === 'game' && {{userScore}} > {{opScore}}",
    "title": "在一场头脑对决中获得{{userScore}}分！彪悍人生不需解释"
  },
  {
    "condition": "{{pageName}} === 'game' && {{userScore}} === {{opScore}}",
    "title": "我在大众PK中难分胜负！你要来玩一把吗？"
  },
  {
    "condition": "{{pageName}} === 'game' && {{userScore}} < {{opScore}}",
    "title": "玩游戏嘛~输赢不要紧，开心最重要！"
  },
  {
    "condition": "{{pageName}} === 'index'",
    "title": "我发现一个超好玩的PK游戏，你要来试试吗？"
  }
]
```

Note:

- 动态配置分享文案
- 分页面和成绩
- 执行 JavaScript 的结果
- 小程序禁用了 `eval` 和 `Function`
- 包体积限制
- JavaScript 语法解析
- 支持 {{}}
- 无函数声明和调用，无变量申明，无逻辑语句。右值

---

### WXML Parser

WXML -> JSON

![cocktail-scripts](./images/cocktail-scripts.svg)

Note:

- 多种小程序转换
- 建立标准节点树
- 解析和生成 WXML 语法
  - XML 语法
  - 支持 {{}}

---

### `parse5` & `htmlparser2` Defects

```xml
<view>{{b<a}}</view>
```

```json
{
  "tagName": "view",
  "children": [
    "{{b",
    {
      "tagName": "a}}"
    }
  ]
}
```

---

WXML Parser + JavaScript Parser

Note:

结合之前的 JavaScript 解析器，可以实现下面的标准节点转换

---

### Standard Node Tree

```json
{
  "tagName": "view",
  "children": [ ... ],
  "attrs": {
    "attribute-name": "string-value",
    "unary-attribute": true,
    "computed-attribute": expression
  },
  "events": {
    "bind": { ... },
    "catch": { ... },
    "capture-bind": { ... },
    "capture-catch": { ... }
  },
  "logic": {
    "for": expression,
    "for-item": expression,
    "for-index": expression,
    "key": expression,
    "if": expression,
    "elif": expression,
    "else": expression
  }
}
```

Note:

- tagName, children, attrs 是 HTML 节点已有的属性
- 将事件和逻辑部分拆出来，便于处理

---

### Standard Node Tree Example

```xml
<view wx:if="{{condition}}" bindtap="handleTap" class="container"></view>
```

```json
{
  "tagName": "view",
  "attrs": {
    "class": "container"
  },
  "events": {
    "bind": {
      "tap": "handleTap"
    }
  },
  "logic": {
    "if": {
      "type": "ExpressionStatement",
      "expression": {
        "type": "Identifier",
        "name": "condition"
      }
    }
  }
}
```

Note:

- 例子
- events 解析
- logic 解析
- 为什么要解析成表达式语法树

---

### Key Accessing

WXMP:

```xml
<view wx:for="{{shops}}" wx:for-item="shop" wx:key="id">
  <text data-id="{{shop.id}}">{{shop.name}}</text>
</view>
```

Vue:

```xml
<wx-view v-for="shop in shops" :key="shop.id">
  <wx-text :data-id="shop.id">{{shop.name}}</wx-text>
</wx-view>
```

Note:

- 为什么要解析成表达式语法树
- 在 key 中添加变量名

---

### Node Merging

```xml
<block wx:if="{{true || false}}">
  <view wx:if="{{false}}"></view>
</block>
```

```xml
<wx-view v-if="(true || false) && false"></wx-view>
```

Note:

- 为什么要解析出来节点上的变量
- 去除 block 节点
- 合并相同的属性
- 逻辑运算优先级

----

### 编译器

源代码 -> 目标代码

Note:

- 将便于人编写、阅读、维护的高级计算机语言所写作的源代码程序
- 翻译为计算机能解读、运行的低阶机器语言的程序
- 源代码一般为高阶语言（High-level language），如 C、C++、Java、JavaScript 等
- 目标语言则是汇编语言或目标机器的目标代码

参考资料：

- http://hcysun.me/vue-design/art/81vue-lexical-analysis.html

---

### 常见的编译器

<div>
- Babel (js)
- Vue (template)
- PostCSS (css)
- V8
- JavaScriptCore
</div><!-- .element: class="fragment" -->

---

### 分类

![compiler type 0](./images/compiler-type-0.svg)

Note:

- V8
- JavaScriptCore

---

![compiler type 1](./images/compiler-type-1.svg)

Note:

- Babel
- PostCSS

---

![compiler type 2](./images/compiler-type-2.svg)

Note:

- Condition Evaluator

----

### 基本概念

- AST
- Tokenizer
- Parser
- Transformer
- Code Generator
- Executor

----

### AST

Abstract Syntax Tree

抽象语法树

![AST Example](./images/ast-0.svg)<!-- .element: style="width: 50%;" -->

Note:

- 树
- 表示源代码
- 隐藏了括号等细节

---

[AST Explorer](https://astexplorer.net/)

Note:

- 各类语言
- 各种解析器

---

### AST

```js
let c = 0;          //  VariableDeclaration
while (a < 10) {    //  WhileStatement
  const b = a % 2;  //    VariableDeclaration
  if (b == 0) {     //    IfStatement
    c++;            //      ExpressionStatement
  }
}
console.log(c);     //  ExpressionStatement
```

Note:

- Declaration 和 Statement 都是声明
- Declaration 一般表示对外声明
- Statement 一般表示自述

---

### Statement

```
Statement
    = Block                 "{" StatementList "}"
    | VariableDeclaration   "var" VariableDeclarationList
    | EmptyStatement        ";"
    | ExpressionStatement   ~("{" | function) Expression
    | IfStatement           "if" "(" Expression ")" Statement ("else" Statement)?
    | WhileStatement        "do" Statement "while" "(" Expression ")"                                               -- doWhile
    |                         | "while" "(" Expression ")" Statement                                                -- whileDo
    | ForStatment           "for" "(" Expression ";" Expression ";" Expression ")" Statement                    -- for3
    |                         | "for" "(" "var" VariableDeclarationList ";" Expression ";" Expression ")" Statement -- for3var
    |                         | "for" "(" LeftHandSideExpression "in" Expression ")" Statement                      -- forIn
    |                         | "for" "(" "var" VariableDeclaration "in" Expression ")" Statement                   -- forInVar
    | ContinueStatement     "continue"
    | BreakStatement        "break"
    | ReturnStatement       "return" (Expression)?
    | WithStatement         "with" "(" Expression ")" Statement
    | LabelledStatement     identifier ":" Statement
    | SwitchStatement       "switch" "(" Expression ")" CaseBlock
    | ThrowStatement        "throw" Expression                                                                      -- throwExpr
    | TryStatement          "try" Block "catch" Block "finally" Block                                               -- tryCatchFinally
    |                         | "try" Block "finally" Block                                                         -- tryFinally
    |                         | "try" Block "catch" Block                                                           -- tryCatch
    | DebuggerStatement     "debugger"
```

Note:

- 描述包含关系的一种语法

参考资料：

- https://segmentfault.com/q/1010000002519511

---

### ExpressionStatement (右值)

```js
{
  array: [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ]
}
```

Note:

- 赋值运算符右侧的值

---

### ExpressionStatement

```
- Literal                 String, Number, Boolean
- Identifier              null, undefined, …
- ObjectExpression        { … }
- ArrayExpression         [ … ]
- CallExpression          … ( … )
- MemberExpression        … . …
- UnaryExpression         + …, - …, ! …, ~ …, void …
- UpdateExpression        … ++, … --
- BinaryExpression        … ** …, … * …, … / …, … % …, … + …, … - …, … << …, … >> …, … >>> …, … < …, … <= …, … > …, … >= …, … == …, … != …, … === …, … !== …, … & …, … ^ …, … | …
- LogicalExpression       … && …, … || …
- ConditionalExpression   … ? … : …
- SequenceExpression      … , …
- AssignmentExpression    … = …, … += …, … -= …, … **= …, … *= …, … /= …, … %= …, … <<= …, … >>= …, … >>>= …, … &= …, … ^= …, … |= …
- ExpressionStatement
```

Note:

- ExpressionStatement 包含的内容

----

### Tokenizer

```js
1 ** 2
```

```js
[
  { type: 'number'  , value: '1' },
  { type: 'operator', value: '**' },
  { type: 'number'  , value: '2' }
]
```

Note:

- 词法分析
- 舍弃空格
- 舍弃注释
- 看代码

---

### Parser

```js
[
  { type: 'number'  , value: '1' },
  { type: 'operator', value: '**' },
  { type: 'number'  , value: '2' }
]
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

```js
{
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'BinaryExpression',
        operator: '**',
        left: { type: 'Literal', value: 1 },
        right: { type: 'Literal', value: 2 }
      }
    }
  ]
}
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

Note:

- 将 token 处理成语法树
- 状态无关：相同的代码出现第一次和第二次是一样的
- 递归解析
- 先了解运算符优先级

---

### Parser

[Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

```json
{
  "**": 15,
  "*": 14,
  "/": 14,
  "%": 14,
  "+": 13,
  "-": 13,
  "<<": 12,
  ">>": 12,
  ">>>": 12,
  "<": 11,
  "<=": 11,
  ">": 11,
  ">=": 11,
  "in": 11,
  "instanceof": 11,
  "==": 10,
  "!=": 10,
  "===": 10,
  "!==": 10,
  "&": 9,
  "^": 8,
  "|": 7,
  "&&": 6,
  "||": 5
}
```

Note:

- 看代码

---

### Transformer

```js
{
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'BinaryExpression',
        operator: '**',
        left: { type: 'Literal', value: 1 },
        right: { type: 'Literal', value: 2 }
      }
    }
  ]
}
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

```js
{
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: { type: 'Identifier', name: 'Math' },
          property: { type: 'Identifier', name: 'pow' }
        },
        arguments: [
          { type: 'Literal', value: 1 },
          { type: 'Literal', value: 2 },
        ]
      }
    }
  ]
}
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

Note:

- 将一种语法树转换成另一种语法树
- 看代码

---

### Code Generator

```js
{
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: { type: 'Identifier', name: 'Math' },
          property: { type: 'Identifier', name: 'pow' }
        },
        arguments: [
          { type: 'Literal', value: 1 },
          { type: 'Literal', value: 2 },
        ]
      }
    }
  ]
}
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

```js
Math.pow(1, 2)
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

Note:

- 将语法树转换成代码字符串
- 看代码

---

### Executor

```js
{
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: { type: 'Identifier', name: 'Math' },
          property: { type: 'Identifier', name: 'pow' }
        },
        arguments: [
          { type: 'Literal', value: 1 },
          { type: 'Literal', value: 2 },
        ]
      }
    }
  ]
}
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

```js
1
```

<!-- .element: style="width: 49%; display: inline-block; vertical-align: middle;" -->

Note:

- 执行语法树
- 看代码

---

### Babel/PostCSS/小程序模板转换

```js
function compiler(input) {
  let tokens = tokenize(input);         // => [ tokens ]
  let ast    = parse(tokens);           // => { ast }
  let newAst = transform(ast);          // => { ast }
  return       codeGenerate(newAst);    // => 'code string'
}
```

Note:

- 把一种语法转换成另一种语法

---

### Condition Evaluator

```js
function compiler(input, scope) {
  let tokens = tokenize(input);       // => [ tokens ]
  let ast    = parse(tokens);         // => { ast }
  return       execute(ast, scope);   // => Returning value
}
```

Note:

- 执行得到结果

----

### [Ohm.js](https://ohmlang.github.io/editor/)

A Parser Generator
