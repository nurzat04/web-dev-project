# Generated by Django 5.0.3 on 2024-04-25 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_remove_book_url_book_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='image',
        ),
    ]