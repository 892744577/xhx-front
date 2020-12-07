# my-project

## 安装依赖
```
npm install
```

### 启动服务
```
npm run serve
```

### 打包
```
npm run build
```

### Customize configuration


### router配置项
```js
const routes = [
    {
        path: '/',  //拦截路由
        name: 'home',//路由名称
        component: () => import('xxxx'),    //路由地址
        meta: { //配置项
            footShow: true,  //显示导航栏(true显示, false不显示)
            keepAlive: true,   //当前页面是否缓存(true缓存, false不缓存); //默认不缓存
        }
    },
]
```

### icon
```html
    <!-- icon用法,默认宽高18px ===> 0.48rem -->
    <svg-icon icon-class="account"></svg-icon>

    <!-- 可以修改大小 -->
    <svg-icon icon-class="account" :width="40" :height="40"></svg-icon>
```
