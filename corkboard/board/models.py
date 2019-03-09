from taggit.managers import TaggableManager

from django.db import models
from django.utils import timezone


class Category(models.Model):
    """
    Category model
    """
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class AdvertManager(models.Manager):
    def active(self):
        return super().filter(is_active=True, expiration_date__gte=timezone.now())


class Advert(models.Model):
    """
    Advert model
    """
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    content = models.TextField()
    image = models.ImageField(blank=True, null=True)
    price = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=2)
    is_active = models.BooleanField(default=True)
    expiration_date = models.DateTimeField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    tags = TaggableManager()
    objects = AdvertManager()

    class Meta:
        ordering = ('-created_on',)

    def __str__(self):
        return self.title
