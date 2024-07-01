from django.db import models
from login.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    creation_date = models.DateField(auto_now_add=True)
    post_type = models.CharField(max_length=255)

    def __str__(self):
        return self.title
