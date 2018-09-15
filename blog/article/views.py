import json
import markdown
import re
from django.core.paginator import Paginator
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render,render_to_response
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_page    #缓存
from .visit_info import change_info     #当网站被访问时，更新网站访问次数
# Create your views here.

#@cache_page(None)  #设置为了永久缓存，当首页修改时需要删除缓存
def index(request):
    change_info(request)     #当网站被访问时，更新网站访问次数
    return render(request,'article/index.html')

#点击下一页时使用ajax局部刷新页面内容
@csrf_exempt        #取消当前函数防跨站请求伪造功能，即便settings中设置了全局中间件。
def pageAjax(request):
    if request.method=='GET':
        page_id=request.GET.get('page_id')
        article=Article.objects.filter(isShow=True).order_by('-id')  #获取所有博客
        paginator=Paginator(article,4)        #分页，每页显示8篇文章
        page_list=paginator.page(int(page_id)).object_list     #获得要返回的页面的文章列表

        #处理要返回的数据
        result=[]
        array=[]
        for p in page_list:
            time=p.createTime.strftime('%Y-%m-%d')      #年月日
            time1 = p.createTime.strftime('%H:%M:%S')   #时分秒
            array.append(time)
            array.append(time1)
            array.append(p.title)
            array.append(str(p.pic))
            temp = markdown.markdown(p.content, extensions=[    #把所有的content都传过去，在js中去掉html标签，空格换行，并截取前80个字符
                'markdown.extensions.extra',
                'markdown.extensions.codehilite',
                'markdown.extensions.toc',
            ])
            dr = re.compile(r'<[^>]+>', re.S)
            temp = dr.sub('', temp).replace('\n', "").replace(' ', '')
            array.append(temp[0:95])
            array.append(p.id)  #文章的id
            result.append(array)
            array=[]
        context={           #字典类型
            'result':result,
            'page_id':page_id,      #当前页面
            'num_pages':paginator.num_pages,    #页面总数
        }
        return HttpResponse(json.dumps(context))    #json.dumps(context)是字符串类型

def detail(request,id):
    change_info(request)     #当网站被访问时，更新网站访问次数
    article=Article.objects.get(id=int(id))     #获取文章
    article.clickNums=article.clickNums+1       #增加访问次数
    article.save()
    article.content = markdown.markdown(article.content.replace("\r\n", '  \n'),extensions=[
                                     'markdown.extensions.extra',
                                     'markdown.extensions.codehilite',
                                     'markdown.extensions.toc',
                                  ])
    meta_category=article.category
    meta_description=re.sub(r'<[^>]+>', "",article.content, re.S)[:80]      #去掉html标签，并截取前80个字符
    context={'article':article,'meta_description':meta_description,'meta_category':meta_category}
    return render(request,'article/detail.html',context)

def chartInfo(request):     #饼图ajax请求数据
    if request.GET.get('name'):     #加载二级图表
        name=request.GET.get('name')
        t1=Category.objects.get(id=1)
        CategoryList=Category.objects.filter(lifeOrStudy=name).order_by('id')  #获取类别
        list1=[]
        result=[]
        for t in CategoryList:
            count=t.article_set.all().count()
            list1.append(count)
            list1.append(t.cname)
            list1.append(t.id)
            result.append(list1)
            list1=[]
        context={'result':result,'name':name}
        return HttpResponse(json.dumps(context))
    else:    #加载一级图表
        lifeList = Category.objects.filter(lifeOrStudy='慢生活')
        lifeCount=0
        for t in lifeList:
            count = t.article_set.all().count()
            lifeCount+=count

        studyList = Category.objects.filter(lifeOrStudy='学无止境')
        studyCount=0
        for t in studyList:
            count = t.article_set.all().count()
            studyCount+=count

        context={'lifeCount':lifeCount,'studyCount':studyCount}
        print(context)
        return HttpResponse(json.dumps(context))

def about(request):
    change_info(request)     #当网站被访问时，更新网站访问次数
    return render(request,'article/about.html')

def learn(request,category_id,page_id):
    change_info(request)     #当网站被访问时，更新网站访问次数
    category_id=int(category_id)
    page_id=int(page_id)
    if category_id == 0:
        article = Article.objects.filter(isShow=True).order_by('-id')
    else:
        category = Category.objects.get(id=category_id)
        article = Article.objects.filter(category=category, isShow=True).order_by('-id')
    category_list=Category.objects.all()

    paginator = Paginator(article, 6)  # 分页，每页显示6篇文章
    page_list = paginator.page(page_id).object_list  # 获得要返回的页面的文章列表

    # 处理要返回的数据
    result = []
    array = []
    for p in page_list:
        time = p.createTime.strftime('%Y-%m-%d')  # 年月日
        time1 = p.createTime.strftime('%H:%M:%S')  # 时分秒
        array.append(time)
        array.append(time1)
        array.append(p.title)
        array.append(str(p.pic))
        temp = markdown.markdown(p.content, extensions=[  # 把所有的content都传过去，在js中去掉html标签，空格换行，并截取前80个字符
            'markdown.extensions.extra',
            'markdown.extensions.codehilite',
            'markdown.extensions.toc',
        ])
        dr = re.compile(r'<[^>]+>', re.S)
        temp = dr.sub('', temp).replace('\n', "").replace(' ', '')
        array.append(temp[0:130])
        array.append(p.id)  # 文章的id
        result.append(array)
        array = []
    context = {  # 字典类型
        'result': result,
        'page_id': page_id,  # 当前页面
        'num_pages': paginator.num_pages,  # 页面总数
        'category_list': category_list,
        'category_id':category_id,
    }
    return render(request,'article/learn.html',context)

def slowlife(request):
    change_info(request)     #当网站被访问时，更新网站访问次数
    return render(request,'article/slowlife.html')

def liuyan(request):
    change_info(request)     #当网站被访问时，更新网站访问次数
    return render(request,'article/liuyan.html')

#404界面
def page_not_found(request):
    change_info(request)     #当网站被访问时，更新网站访问次数
    return render_to_response('404.html')

#sitemap
def sitemap(request):
    return render(request,'sitemap.xml',content_type="application/xml")


