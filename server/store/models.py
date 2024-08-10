from django.db import models
from django.utils.text import slugify

# Create your models here.

class Print(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.URLField(max_length=500)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Print, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Print"
        verbose_name_plural = "Prints"
        ordering = ['name']

    def __str__(self):
        return self.name


class Variant(models.Model):
    SIZE_CHOICES = [
        ('SM', 'Small'),
        ('MD', 'Medium'),
        ('LG', 'Large'),
        ('XL', 'Extra Large'),
    ]

    print = models.ForeignKey(Print, related_name='variants', on_delete=models.CASCADE)
    size = models.CharField(max_length=2, choices=SIZE_CHOICES)
    width = models.DecimalField(max_digits=3, decimal_places=1)
    length = models.DecimalField(max_digits=3, decimal_places=1)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    stripe_product_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_price_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.print.name} - {self.get_size_display()}'

    class Meta:
        verbose_name = "Variant"
        verbose_name_plural = "Variants"
        ordering = ['print', 'width']
