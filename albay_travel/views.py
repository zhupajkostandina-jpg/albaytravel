from django.shortcuts import render, get_object_or_404
from .models import Tour


def home(request):
    featured_tours = Tour.objects.filter(is_active=True, is_featured=True)[:3]
    if featured_tours.count() < 3:
        featured_tours = Tour.objects.filter(is_active=True)[:3]
    return render(request, 'home.html', {'featured_tours': featured_tours})


def tours_list(request):
    category = request.GET.get('filter', 'all')
    tours = Tour.objects.filter(is_active=True)
    if category and category != 'all':
        tours = tours.filter(category__icontains=category)
    return render(request, 'tours_list.html', {
        'tours': tours,
        'active_filter': category,
    })


def tour_detail(request, slug):
    tour = get_object_or_404(Tour, slug=slug, is_active=True)
    gallery = list(tour.gallery_images.all())
    related_tours = Tour.objects.filter(is_active=True).exclude(pk=tour.pk)[:2]
    return render(request, 'tour_detail.html', {
        'tour': tour,
        'gallery': gallery,
        'related_tours': related_tours,
    })


def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')