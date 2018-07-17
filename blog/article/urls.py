from django.conf.urls import url
from django.urls import include
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name='article'
urlpatterns = [
    url(r'^$',views.index, name='index'),
    url(r'^pageAjax$',views.pageAjax,name='pageAjax'),      #页面ajax数据请求
    url(r'^detail/(\d+)/$',views.detail,name='detail'),
    url(r'^chartInfo$',views.chartInfo,name='chartInfo'),   #图表ajax数据请求
    url(r'^about/$',views.about,name='about'),
    url(r'^learn/$',views.learn,name='learn'),
    url(r'^slowlife/$',views.slowlife,name='slowlife'),
    url(r'^liuyan/$',views.liuyan,name='liuyan'),
]
