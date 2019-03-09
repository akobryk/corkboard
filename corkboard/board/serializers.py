from rest_framework import serializers
from .models import Advert


class StringListField(serializers.ListField):
    child = serializers.CharField()

    def to_representation(self, data):
        return ', '.join(data.values_list('name', flat=True))


class AdvertSerializer(serializers.ModelSerializer):
    tags = StringListField()

    class Meta:
        model = Advert
        exclude = ('is_active', 'expiration_date')
