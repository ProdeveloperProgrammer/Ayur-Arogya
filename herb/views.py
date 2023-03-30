from django.shortcuts import render,redirect
from datetime import datetime
from django.contrib import messages
# Create your views here.
def mainpage(request):
   if request.method =="GET":
        if request.user.is_anonymous: 
            return render(request,'herb/herb.html')
        else:
            if request.user.is_superuser:
                return render(request,'herb/herb.html')
            else:
                return render(request,'herb/herb.html')
   else:
      return render(request,"404.html")

