import { Service } from 'node-windows';  
  
// 创建一个新的服务对象  
const svc = new Service({  
  name: 'My Node.js Service',  
  description: 'This is a sample Node.js service.',  
  script: 'index.js', // 指定你的Node.js服务入口文件  
  nodeOptions: [  
    '--harmony',  
    '--max_old_space_size=4096'  
  ]  
});  
  
// 监听 "install" 事件，该事件表示服务已可用  
svc.on('install', () => {  
  svc.start(); // 在安装完成后启动服务  
});  
  
// 安装服务  
svc.install();