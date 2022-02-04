# Generated by Django 3.2.10 on 2021-12-21 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20211221_0928'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataconsumer',
            name='building',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.building'),
        ),
        migrations.AlterField(
            model_name='dataconsumer',
            name='job_title',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.job'),
        ),
        migrations.AlterField(
            model_name='dataconsumer',
            name='organizational_entity',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.organizationalentity'),
        ),
        migrations.AlterField(
            model_name='organizationalentity',
            name='location',
            field=models.ForeignKey(blank=True, help_text='It is mandatory to only use this field, when the entity is best described by only one location', null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.businesslocation'),
        ),
        migrations.AlterField(
            model_name='organizationalentity',
            name='parent',
            field=models.ForeignKey(blank=True, help_text='Choose a parent entity', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='api.organizationalentity'),
        ),
        migrations.AlterField(
            model_name='organizationalentity',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.organizationalentitytypes'),
        ),
    ]
