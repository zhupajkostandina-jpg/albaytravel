from django.contrib import admin
from django.utils.html import format_html
from .models import Tour, TourImage


class TourImageInline(admin.TabularInline):
    model = TourImage
    extra = 10
    fields = ('image', 'alt_text', 'order')


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'is_active', 'is_featured', 'order', 'thumbnail')
    list_editable = ('is_active', 'is_featured', 'order')
    list_filter = ('category', 'is_active', 'is_featured')
    search_fields = ('title', 'location')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [TourImageInline]

    def thumbnail(self, obj):
        if obj.main_image:
            return format_html(
                '<img src="{}" style="height:48px; width:72px; object-fit:cover; border-radius:4px;" />',
                obj.main_image.url
            )
        return '—'
    thumbnail.short_description = 'Image'


@admin.register(TourImage)
class TourImageAdmin(admin.ModelAdmin):
    list_display = ('tour', 'alt_text', 'order')


admin.site.site_header = 'ALBAY TRAVEL Admin'
admin.site.site_title = 'Albay Travel'
admin.site.index_title = 'Manage Your Tours'