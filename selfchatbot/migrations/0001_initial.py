# Generated by Django 5.0.6 on 2024-07-01 04:38

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ChatMessage",
            fields=[
                ("question_id", models.AutoField(primary_key=True, serialize=False)),
                ("user_id", models.IntegerField()),
                ("session_id", models.IntegerField()),
                ("question_content", models.TextField()),
                ("answer_content", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
