# Generated by Django 4.1.7 on 2023-03-20 07:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0002_alter_contactrequest_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactrequest',
            name='Date',
            field=models.DateField(default=datetime.datetime(2023, 3, 20, 7, 29, 7, 344607, tzinfo=datetime.timezone.utc)),
        ),
    ]