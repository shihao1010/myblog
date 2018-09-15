from django.conf.urls import url
from django.urls import include
from django.conf.urls.static import static
from django.conf import settings
from . import views
from . import search_views

app_name='article'
urlpatterns = [
    url(r'^$',views.index, name='index'),
    url(r'^pageAjax$',views.pageAjax,name='pageAjax'),      #页面ajax数据请求
    url(r'^detail/(\d+)/$',views.detail,name='detail'),
    url(r'^chartInfo$',views.chartInfo,name='chartInfo'),   #图表ajax数据请求
    url(r'^about/$',views.about,name='about'),
    url(r'^learn/(\d+)/(\d+)/$',views.learn,name='learn'),      #第一个d+是类别id，当第一个d+为0时，表示全部类别，第二个是该类别页码
    url(r'^slowlife/$',views.slowlife,name='slowlife'),
    url(r'^liuyan/$',views.liuyan,name='liuyan'),
    url(r'^search/', search_views.MySeachView(), name='haystack_search'),
    url(r'^sitemap\.xml$', views.sitemap, name='sitemap'),
]
