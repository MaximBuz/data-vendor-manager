# Generated by Django 3.2.10 on 2021-12-22 09:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20211221_1322'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='organizationalentity',
            name='location',
        ),
        migrations.AddField(
            model_name='dataconsumer',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.businesslocation'),
        ),
    ]