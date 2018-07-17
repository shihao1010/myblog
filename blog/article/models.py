from django.db import models
from mdeditor.fields import MDTextField

# Create your models here.

#文章类别
class Category(models.Model):
    cname=models.CharField(verbose_name='类别名字',unique=True,max_length=20)
    isShow=models.BooleanField(verbose_name='是否显示',default=True)     #是否显示，默认显示
    lifeOrStudy_CHOICES=(
        ('学无止境', '学无止境'),
        ('慢生活','慢生活'),     #第一个参数是真正的model参数，#第二个参数则是方便人们理解阅读
    )
    lifeOrStudy=models.CharField(verbose_name='所属总分类',max_length=10,choices=lifeOrStudy_CHOICES,default='学无止境')
    class Meta:
        verbose_name = '文章类别'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.cname

#文章标签
class Tag(models.Model):
    tname=models.CharField(verbose_name='标签',unique=True,max_length=15) #标签名字
    isShow=models.BooleanField(verbose_name='是否显示',default=True)     #是否显示，默认显示
    class Meta:
        verbose_name = '文章标签'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.tname

#博客文章
class Article(models.Model):
    title=models.CharField(verbose_name='标题',unique=True,max_length=30)     #标题
    content = MDTextField(verbose_name='正文',default='')
    createTime=models.DateTimeField(verbose_name='创建时间',auto_now_add=True) #应该设置为auto_now_add=True,也可以暂时先用default=timezone.now
    modifyTime=models.DateTimeField(verbose_name='上次修改时间',auto_now=True) #auto_now=True，在你修改时，会自动变成当前时间。
    clickNums=models.IntegerField(verbose_name='点击量',default=0)    #点击量，默认从0开始
    pic=models.ImageField(verbose_name='博客封面图片',upload_to='pic_img',default='pic_img/book.jpg')
    tag=models.ManyToManyField(Tag,verbose_name='文章标签')     #多对多关系
    category=models.ForeignKey(Category,verbose_name='文章类别',on_delete=models.CASCADE)    #外键
    isShow=models.BooleanField(verbose_name='是否显示',default=True)        #是否显示
    class Meta:
        verbose_name = '我的博客'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.title

