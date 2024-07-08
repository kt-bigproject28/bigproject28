# Generated by Django 5.0.6 on 2024-07-08 17:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("prediction", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="CropData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("crop_name", models.CharField(max_length=100)),
                ("land_area", models.FloatField()),
                ("ratio", models.FloatField()),
                ("income", models.FloatField()),
                ("latest_year", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="CropResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("crop_name", models.CharField(max_length=100)),
                ("latest_year", models.IntegerField()),
                ("adjusted_data", models.JSONField()),
                ("price", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Prediction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("land_area", models.FloatField()),
                ("region", models.CharField(max_length=100)),
                ("total_income", models.FloatField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Crop",
        ),
        migrations.AddField(
            model_name="cropresult",
            name="prediction",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="crop_results",
                to="prediction.prediction",
            ),
        ),
    ]
