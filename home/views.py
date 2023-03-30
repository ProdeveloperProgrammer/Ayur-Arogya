from django.shortcuts import render,redirect,HttpResponse
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
# Create your views here.

Veda_model = AyurvedaModel.objects.all()
def mainpage(request):
   query = {
        "veda_model" : Veda_model,
        "latest_veda_model" : AyurvedaModel.objects.all().order_by("-Created_at")[0:5]
    }
   if request.method =="GET":
        if request.user.is_anonymous: 
            return render(request,'home/home.html',query)
        else:
            if request.user.is_superuser:
                return render(request,'home/home.html',query)
            else:
                return render(request,'home/home.html',query)
   else:
      return render(request,"404.html")
   

def update_veda(request):
    if request.method =="GET":
        if request.user.is_anonymous: 
            return render(request,'404.html')
        else:
            if request.user.is_superuser:
                return render(request,'home/update_veda.html')
            else:
                return render(request,'404.html')
    elif request.method == "POST":
        modelname = request.POST["ayurveda_name"]
        modeldetail = request.POST["detail_veda"]
        modelfile = request.FILES["veda_img"]
        AyurvedaModel.objects.create(Name=modelname,Detail=modeldetail,Photo=modelfile)
        print("success")
        return redirect("homepage_main")

    else:
      return render(request,"404.html")
@csrf_exempt
def search_veda(request):
    if request.method =="POST":
        received_json_data=json.loads(request.body)
        search_content = received_json_data.get("search_content")
        search_result = {
            "model_filtered" : serializers.serialize(
                "json",AyurvedaModel.objects.filter(Name__icontains=str(search_content))
            ),
            "search_count":AyurvedaModel.objects.filter(Name__icontains=str(search_content)).count()
        }
        return JsonResponse(search_result,safe=False)

    elif request.method == "GET":
        return redirect("/")
    else:
      return render(request,"404.html")


