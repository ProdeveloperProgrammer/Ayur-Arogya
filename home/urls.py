from django.urls import path
from home import views

urlpatterns = [
    path("",views.mainpage,name="homepage_main"),
    path("update_veda/",views.update_veda,name="update_veda"),
    path("search/",views.search_veda,name="search_veda"),
]

