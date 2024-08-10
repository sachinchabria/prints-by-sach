from rest_framework import serializers
from .models import Print, Variant


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = ['id', 'size', 'width', 'length', 'price']


class SimplePrintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Print
        fields = ['name', 'slug', 'image']


class PrintSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, read_only=True)

    class Meta:
        model = Print
        fields = ['id', 'name', 'slug', 'image', 'variants']
