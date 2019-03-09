from rest_framework import routers
from board.viewsets import AdvertViewSet

router = routers.DefaultRouter()
router.register(r'adverts', AdvertViewSet)
