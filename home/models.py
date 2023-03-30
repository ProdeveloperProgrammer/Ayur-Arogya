from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import os

# Create your models here.
class AyurvedaModel(models.Model):
    Name = models.CharField(max_length=500,default="")
    Detail = models.TextField(max_length=6000,default="")
    Photo = models.ImageField(verbose_name="Photo")
    Created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.Name
    
@receiver(pre_delete,sender=AyurvedaModel)
def delete_file(sender,instance,**kwargs):
    if instance.Photo:
        os.remove(instance.Photo.path)