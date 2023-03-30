import django
from django.db import models
# Create your models here.
class ContactRequest(models.Model):
    Name = models.CharField(max_length=500,default="")
    Email = models.EmailField(max_length=600,default="")
    Query = models.TextField()
    Date = models.DateField(default="")
    def __str__(self):
        return self.Name
