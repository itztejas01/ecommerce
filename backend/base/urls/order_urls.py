from django.urls import path
from django.urls.resolvers import URLPattern
from base.views import order_views as views


urlpatterns = [
    path('',views.getOrders, name='orders'),
    path('add/',views.addOrderItems, name='order-add'),
    path('myorders/',views.getMyOrders, name='my-order'),
    
    path('<str:pk>/deliver/',views.updateOrderToDelivered, name='order-delivered'),
    
    path('<str:pk>/',views.getOrderById, name='user-order'),
    path('<str:pk>/pay/',views.updateOrderToPaid, name='pay'),
]