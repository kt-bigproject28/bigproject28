# views.py
from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from .models import Pest, PestDetection
from .utils import process_image


# @login_required
def upload_image_for_detection(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image_file.name, image_file)
        image_url = fs.url(filename)
        user = request.user
        # Process the image and get pest ID and confidence
        pest_id, confidence = process_image(image_file)

        try:
            # Use the specified database for querying
            pest_info = Pest.objects.using('detect_db').get(id=pest_id)
            # Use the specified database for saving
            detection = PestDetection(
                user=user,
                pest=pest_info,
                image=image_file,
                detection_date=timezone.now()
            )
            detection.save(using='detect_db')

            context = {
                'pest_name': pest_info.pest_name,
                'threat_level': pest_info.threat_level,
                'prevention_methods': pest_info.general_prevention_methods,
                'confidence': confidence,
                'image_url': image_url
            }
            return render(request, 'result.html', context)
        except Pest.DoesNotExist:
            return render(request, 'result.html', {
                'error': 'Pest not found. Please try another image.'
            })

    return render(request, 'upload.html')