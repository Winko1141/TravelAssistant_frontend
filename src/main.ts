import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Button } from 'vant'
import { Icon } from 'vant';
import "amfe-flexible"    //动态改变和字体大小

import 'vant/lib/index.css'

const app = createApp(App)
app.use(Icon)
app.use(router)
app.use(Button)
app.mount('#app')
