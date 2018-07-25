from django.contrib import admin
from .models import *
# Register your models here.

admin.site.site_header = '博客后台管理系统'
admin.site.site_title = '博客后台管理'


class ArticleAdmin(admin.ModelAdmin):
    list_per_page = 20              #admin中每页放多少条数据
    list_display = ['id','title','createTime','modifyTime','clickNums','category','isShow']     #admin中显示那些属性
    search_fields = ['title']       #搜索框（只有Charfield可以搜索）
    date_hierarchy = 'createTime'  # 详细时间分层筛选　
    filter_horizontal = ('tag',)    #修改manytomany自带的显示效果
    list_filter = ['category','tag']     #右侧过滤器
    ordering = ('-createTime','title')   #ordering设置默认排序字段，负号表示降序排序
    fieldsets = (                       #分组显示
        ("base info", {'fields': ['title','category','pic','clickNums','tag','isShow']}),
        ("Content", {'fields': ['content']})
    )

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','cname','lifeOrStudy','isShow']
    ordering = ('id', 'cname')
    search_fields = ['cname']  # 搜索框（只有Charfield可以搜索）
    list_filter = ['lifeOrStudy']  # 搜索框（只有Charfield可以搜索）

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'tname', 'isShow']
    ordering = ('id', 'tname')

admin.site.register(Article, ArticleAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag,TagAdmin)
