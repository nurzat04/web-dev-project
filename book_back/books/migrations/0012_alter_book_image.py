# Generated by Django 5.0.3 on 2024-04-26 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0011_book_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.URLField(),
        ),
    ]