# Generated by Django 4.2.13 on 2024-08-10 17:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='variant',
            options={'ordering': ['print', 'width'], 'verbose_name': 'Variant', 'verbose_name_plural': 'Variants'},
        ),
    ]
