from django.db import models

class CommonChars(models.Model):
    char = models.CharField(max_length=4)
    rank = models.CharField(max_length=16)
    created_at = models.DateTimeField(auto_now_add=True)

