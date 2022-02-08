# Generated by Django 3.2.10 on 2021-12-21 09:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20211214_1144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='building_location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buildings', to='api.businesslocation'),
        ),
        migrations.AlterField(
            model_name='businesslocation',
            name='state',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='businesslocation',
            name='zip_code',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]