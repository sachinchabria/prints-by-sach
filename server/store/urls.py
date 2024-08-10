from django.urls import path
from . import views

urlpatterns = [
    path('prints/', views.PrintIndexView.as_view(), name='print-index'),
    path('prints/<slug:slug>/', views.PrintDetailView.as_view(), name='print-detail'),
]
