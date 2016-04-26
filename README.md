# Vue.pager
Vue 分页组件

## 生成
	npm install
	gulp

## 使用
	<pager :pages="pages" :current="current" :ommit-before="ommitBefore" :ommit-after="ommitAfter" :page-changed="pagerCallback"></pager>

## 属性
| name | type | default | required | description |
| ---- | ---- | :-----: | :------: | ----------- |
| `pages` | `int` | `0` | :white_check_mark: | 总页数 |
| `current` | `int` | `1` | :white_check_mark: | 当前页 |
| `page-changed` | `(int) -> void` | | | 页码改变回调函数 |
| `ommit-threshold` | `int` | `10` | | 省略阈值 |
| `ommit-before` | `int` | `3` | | 当前页前最多输出页数 |
| `ommit-after` | `int` | `3` | | 当前页后最多输出页数 |
