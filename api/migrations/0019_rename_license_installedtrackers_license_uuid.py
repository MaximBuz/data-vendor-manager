# Generated by Django 3.2.10 on 2022-01-25 10:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20220125_1030'),
    ]

    operations = [
        migrations.RenameField(
            model_name='installedtrackers',
            old_name='license',
            new_name='license_uuid',
        ),
    ]
