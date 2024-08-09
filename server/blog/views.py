from datetime import timedelta
from django.utils.timezone import now

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tag, Post, Comment
from .serializers import  TagSerializer, SimplePostSerializer, PostSerializer, CommentSerializer

# Create your views here.

class PostIndexView(APIView):
    def get(self, request, *args, **kwargs):
            time_range = request.GET.get('time_range', 'short')

            if time_range == 'long':
                posts = self.getPostsLong()
            elif time_range == 'medium':
                posts = self.getPostsMedium()
            else:
                posts = self.getPostsShort()

            serializer = SimplePostSerializer(posts, many=True)
            return Response(serializer.data)

    def getPostsShort(self):
        """ Posts created within the last 4 weeks. """
        four_weeks_ago = now() - timedelta(weeks=4)
        return Post.objects.filter(created__gte=four_weeks_ago)

    def getPostsMedium(self):
        """  Posts created within the last 6 months. """
        six_months_ago = now() - timedelta(days=6*30)
        return Post.objects.filter(created__gte=six_months_ago)

    def getPostsLong(self):
        """ Get all posts (all time). """
        return Post.objects.all()


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
