from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from .models import Pest, PestDetection
from .utils import process_image

@login_required
def upload_image_for_detection(request):
    if request.method != 'POST' or not request.FILES.get('image'):
        return render(request, 'upload.html')

    # Handle file upload
    image_file = request.FILES['image']
    fs = FileSystemStorage()
    filename = fs.save(image_file.name, image_file)
    image_url = fs.url(filename)

    # Process the image to detect pests and get confidence level
    pest_id, confidence = process_image(image_file)

    try:
        # Retrieve the detected pest's information using the correct field
        pest_info = Pest.objects.get(id=pest_id)
    except Pest.DoesNotExist:
        # return render(request, 'result.html', {
        #     'error': 'Pest not found. Please try another image.'
        # })
            pest_info = Pest.objects.get(id=1)
            confidence = 0.0
    # Save the detection information in the database
    detection = PestDetection(
        user=request.user,
        pest=pest_info,
        image=image_file,
        detection_date=timezone.now(),
        confidence=confidence
    )
    detection.save()

    # Prepare context data for the results page
    context = {
        'pest_name': pest_info.pest_name,
        'occurrence_environment': pest_info.occurrence_environment,
        'symptom_description': pest_info.symptom_description,
        'prevention_methods': pest_info.prevention_methods,
        'pesticide_name': pest_info.pesticide_name,
        'image_url': pest_info.image_url,  # Use the pest's image_url field
        'confidence': confidence
    }

    # Render the results page with the detection info
    return render(request, 'result.html', context)
