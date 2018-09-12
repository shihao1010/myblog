<h1>一个使用django开发的个人博客</h1>

<h3>开发环境如下：</h3>

1：开发系统：linux（这个对项目没什么太大影响，个人习惯写项目用linux）

2：开发语言：python3+django2

3：数据库：mysql

4：IDE：pycharm

博客地址为：http://www.shihao.online/

个人博客知识分享，自己用django搭建的个人博客

前端界面由html,css,js,bootstrap完成

后台为django，数据库为mysql，同时使用redis数据库做缓存（也可以不缓存），

网站引入了echarts图表，博客后台引入了markdown编辑器，

网站部署在阿里云，部署方式为nginx+uwsgi，

源码在上面，喜欢的给个星


项目使用方式（如果需要在本地运行实验的话）：

1：将项目下载到本地，创建django虚拟环境

2：创建数据库blog，将blog.sql导入（这是我的数据，可以做实验用）

3：激活虚拟环境，安装所需的包（在plist.txt中），可使用pip install -r plist.txt安装

4：修改一些haystack的配置(haystack是用来全文检索的），需要修改一些东西才可以使用（注：如果不修改，搜索功能无法使用）

	1：在虚拟环境中找到venv/lib/python3.5/site-packages/haystack/backends（这是我的路径，不知道其他的是不是，就那么几个文件夹，可以找找）

	2：将ChineseAnalyzer.py拷贝到该目录下（该文件在github项目上有）

	3：复制whoosh_backend.py文件，改名为whoosh_cn_backend.py

	4：在whoosh_cn_backend.py中开始位置添加from .ChineseAnalyzer import ChineseAnalyzer 
	然后查找

	analyzer=StemmingAnalyzer()

	改为

	analyzer=ChineseAnalyzer()

5：创建超级管理员python manage.py createsuperuser

6：python manage.py runserver
