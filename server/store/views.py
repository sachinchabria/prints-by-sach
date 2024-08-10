from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Print, Variant
from .serializers import SimplePrintSerializer, PrintSerializer
from .cart import Cart

# Create your views here.

class PrintIndexView(generics.ListAPIView):
    queryset = Print.objects.all()
    serializer_class = SimplePrintSerializer


class PrintDetailView(generics.RetrieveAPIView):
    queryset = Print.objects.all()
    serializer_class = PrintSerializer
    lookup_field = 'slug'


class CartView(APIView):
    def get(self, request):
        cart = Cart(request)
        cart_data = cart.get_cart()
        return Response(cart_data)

@csrf_exempt
def add_to_cart(request, variant_id):
    try:
        cart = Cart(request)
        variant = get_object_or_404(Variant, pk=variant_id)
        quantity = int(request.GET.get('quantity', 1))
        cart.add(variant, quantity)
        return JsonResponse({'success': True, 'message': 'Item added to cart.'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Failed to add item to cart. Error: {str(e)}'}, status=500)

@csrf_exempt
def remove_from_cart(request, variant_id):
    cart = Cart(request)
    cart.remove(variant_id)
    return JsonResponse({'success': True, 'message': 'Item removed from cart.'})
