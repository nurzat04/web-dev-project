# Generated by Django 5.0.3 on 2024-04-25 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0008_remove_book_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='book_images/'),
        ),
    ]
