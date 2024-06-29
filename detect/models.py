# detect/models.py

from django.db import models
from django.conf import settings

class Pest(models.Model):
    pest_name = models.CharField(max_length=100)
    description = models.TextField()
    threat_level = models.CharField(max_length=50)
    prevention_method = models.TextField()

    def __str__(self):
        return self.pest_name

class PestDetection(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    pest = models.ForeignKey(Pest, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='detections/')
    detection_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pest.pest_name} detected by {self.user.username} on {self.detection_date.strftime('%Y-%m-%d %H:%M')}"
