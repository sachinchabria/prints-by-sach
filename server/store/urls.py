from django.urls import path
from . import views

urlpatterns = [
    path('prints/', views.PrintIndexView.as_view(), name='print-index'),
    path('prints/<slug:slug>/', views.PrintDetailView.as_view(), name='print-detail'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/<int:variant_id>/', views.add_to_cart,  name='cart-add'),
    path('cart/remove/<int:variant_id>/', views.remove_from_cart, name='cart-remove'),
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view()),
]
