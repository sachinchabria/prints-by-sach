from datetime import timedelta
from django.utils.timezone import now

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tag, Post, Comment
from .serializers import  TagSerializer, SimplePostSerializer, PostSerializer, CommentSerializer

# Create your views here.

class PostIndexView(APIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'


class TagIndexView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetailView(generics.RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'


class CreateCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
