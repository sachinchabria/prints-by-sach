from rest_framework import serializers
from .models import Tag, Post, Comment


class SimpleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']


class TagSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ['name', 'slug', 'image', 'description', 'posts']
    
    def get_posts(self, obj):
        posts = Post.objects.filter(tags=obj)
        return SimplePostSerializer(posts, many=True).data


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author', 'body', 'created']


class SimplePostSerializer(serializers.ModelSerializer):
    tags = SimpleTagSerializer(many=True)

    class Meta:
        model = Post
        fields = ['title', 'slug', 'image', 'caption', 'created', 'tags']


class PostSerializer(serializers.ModelSerializer):
    tags = SimpleTagSerializer(many=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'image', 'caption', 'created', 'tags', 'comments']
