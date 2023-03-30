from django.urls import path
from herb import views

urlpatterns = [
    path("",views.mainpage,name="herb_main"),
]