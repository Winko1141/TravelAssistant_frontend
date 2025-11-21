import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Button, Image as VanImage, Loading ,Uploader, Field, CellGroup  } from 'vant'
import { Icon } from 'vant';
import "amfe-flexible"    //动态改变和字体大小

import 'vant/lib/index.css'

const app = createApp(App)
app.use(Icon)
app.use(router)
app.use(Loading)
app.use(Uploader)
app.use(Field)
app.use(CellGroup)
app.use(Button)
app.use(VanImage)
app.mount('#app')
