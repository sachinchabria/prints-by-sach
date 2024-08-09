from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostIndexView.as_view(), name='post-index'),
    path('posts/<slug:slug>/', views.PostDetailView.as_view(), name='post-detail'),
    path('tags/', views.TagIndexView.as_view(), name='tag-index'),
    path('tags/<slug:slug>/', views.TagDetailView.as_view(), name='tag-detail'),
    path('comments/new/', views.CreateCommentView.as_view(), name='comment-create'),
]
