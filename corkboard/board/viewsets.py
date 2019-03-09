from rest_framework import viewsets, filters
from django_filters import rest_framework as django_filters

from .models import Advert
from .pagination import StandardResultsSetPagination
from .serializers import AdvertSerializer


class AdvertViewSet(viewsets.ModelViewSet):
    queryset = Advert.objects.active()
    serializer_class = AdvertSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (django_filters.DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filterset_fields = ('price',)
    search_fields = ('title', 'content')
    ordering_fields = ('created_on',)
