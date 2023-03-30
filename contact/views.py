from django.shortcuts import render,redirect
from datetime import datetime
from django.contrib import messages
from contact.models import *
# Create your views here.
def index(request):
    if request.method =="GET":
        if request.user.is_anonymous: 
            return render(request,'404.html')
        else:
            if request.user.is_superuser:
                return render(request,'404.html')
            else:
                return render(request,'404.html')
    elif request.method =="POST":
        contact_name = request.POST["name"]
        contact_email = request.POST["email"]
        contact_message = request.POST["message"]
        ContactRequest.objects.create(Name=contact_name,Email=contact_email,Query=contact_message,Date=datetime.now())
        messages.success(request,"Succesfully submitted!")
        return redirect("homepage_main")
    else:
      return render(request,"404.html")
    


