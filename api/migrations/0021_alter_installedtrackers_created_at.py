# Generated by Django 3.2.10 on 2022-01-25 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_installedtrackers_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='installedtrackers',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]