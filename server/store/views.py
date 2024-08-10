from rest_framework import generics
from .models import Print
from .serializers import SimplePrintSerializer, PrintSerializer

# Create your views here.

class PrintIndexView(generics.ListAPIView):
    queryset = Print.objects.all()
    serializer_class = SimplePrintSerializer


class PrintDetailView(generics.RetrieveAPIView):
    queryset = Print.objects.all()
    serializer_class = PrintSerializer
    lookup_field = 'slug'
