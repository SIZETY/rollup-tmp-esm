# git 规范

## 提交规范

- feat: 开发新功能
- fix: 修复 Bug，不改变功能
- docs: 修改文档
- style: 修改代码样式，不修改逻辑
- refactor: 重构代码逻辑，不修改功能
- test: 修改测试代码

## 提交对应版号

| SemVer                              | Conventional Commits                              |
| ----------------------------------- | ------------------------------------------------- |
| Patch（修订号），向下兼容的问题修正 | 提交 type 为 fix                                  |
| Minor（次版号），向下兼容功能性新增 | 提交 type 为 feat                                 |
| Major（主版本号），不兼容 API 修改  | 提交 type 的值后面加 ! 或脚注包含 BREAKING CHANGE |
