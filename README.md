博客地址为：http://www.shihao.online/

个人博客知识分享，自己用django搭建的个人博客

前端界面由html,css,js,bootstrap完成

后台为django，数据库为mysql，同时使用redis数据库做缓存（也可以不缓存），

网站引入了echarts图表，博客后台引入了markdown编辑器，

网站部署在阿里云，部署方式为nginx+uwsgi，

源码在上面，喜欢的给个星


项目使用方式：

1：将项目下载到本地，创建django虚拟环境

2：创建数据库blog，将blog.sql导入（这是我的数据，可以做实验用）

3：激活虚拟环境，安装所需的包（在plist.txt中），可使用pip install -r plist.txt安装

4：创建超级管理员python manage.py createsuperuser

5：python manage.py runserver
