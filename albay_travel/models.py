from django.db import models

# Create your models here.
from django.db import models

class Tour(models.Model):
    CATEGORY_CHOICES = [
        ('private', 'Private Tour'),
        ('offroad', '4x4 Offroad'),
        ('boat', 'Boat Trip'),
    ]

    BADGE_CHOICES = [
        ('Bestseller', 'Bestseller'),
        ('Relaxation', 'Relaxation'),
        ('Adventure', 'Adventure'),
        ('New', 'New'),
        ('Popular', 'Popular'),
        ('', 'None'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()

    highlights = models.TextField(blank=True)
    itinerary = models.TextField(blank=True)
    included = models.TextField(blank=True)
    important_info = models.TextField(blank=True)

    category = models.CharField(
    max_length=50,
    choices=CATEGORY_CHOICES,
    default='private'
)

    badge = models.CharField(max_length=20, choices=BADGE_CHOICES, blank=True, default='')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    price_label = models.CharField(max_length=50, default='/ person', blank=True)
    duration = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    group_size = models.CharField(max_length=50)
    main_image = models.ImageField(upload_to='tours/')
    whatsapp_number = models.CharField(max_length=20, default='355686033460')
    min_guests = models.PositiveIntegerField(default=2)
    max_guests = models.PositiveIntegerField(default=12)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('tour_detail', kwargs={'slug': self.slug})

    def get_guest_range(self):
        return range(self.min_guests, self.max_guests + 1)


class TourImage(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='tours/gallery/')
    alt_text = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.tour.title} — image {self.order}"