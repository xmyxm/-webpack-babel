AST语法树转换 https://astexplorer.net/
webpack原理介绍，以及loaders原理介绍，以及plgun介绍 https://imweb.io/topic/5baca58079ddc80f36592f1a
V8 内存浅析 https://zhuanlan.zhihu.com/p/33816534

babel相关命令
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s

