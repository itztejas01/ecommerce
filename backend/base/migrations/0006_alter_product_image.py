# Generated by Django 3.2.7 on 2021-10-13 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_shippingaddress_district'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/loading.jpg', null=True, upload_to=''),
        ),
    ]
