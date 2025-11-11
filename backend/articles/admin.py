# Register your models here.
from django.contrib import admin
from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'created_at')
    
# Register your models here.
admin.site.register(Article, ArticleAdmin)