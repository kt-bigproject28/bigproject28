# soil/views.py

from django.shortcuts import render
import requests
import xml.etree.ElementTree as ET
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

def index(request):
    return render(request, 'soil.html')

# 카카오맵 api
def get_b_code(address):
    # Kakao API URL 설정
    url = 'https://dapi.kakao.com/v2/local/search/address.json'

    # 요청 파라미터 설정
    params = {
        'query': address
    }

    # 요청 헤더 설정 (여기에 실제 REST API 키를 넣어야 합니다)
    headers = {
        'Authorization': 'KakaoAK c3899565939c467eee249e97805d28c1'
    }

    # API 요청 보내기
    response = requests.get(url, headers=headers, params=params)

    # 응답 확인
    if response.status_code == 200:
        data = response.json()

        # 'b_code' 값 추출
        for document in data['documents']:
            address_info = document.get('address')

            if address_info:
                return address_info.get('b_code')
    
        print("유효한 주소 정보를 찾을 수 없습니다.")
        return None
    else:
        print(f"API 요청 실패: {response.status_code}")
        print(response.text)
        return None
    
#법정동 코드 이용해서 화학성값 주소목록 불러오기   
def get_soil_exam_data(b_code):
    url = 'http://apis.data.go.kr/1390802/SoilEnviron/SoilExam/getSoilExamList'
    params = {
        'serviceKey': 'XMihbktoJgeXAASWbeYTDZaWDPRL08q/i+1Sml2083f1m3gcyPJ2T1YwIrbry0Fe+HA1R4EU0S+zNL4LjuGBbQ==',
        'Page_Size': '200',
        'Page_No': '1',
        'BJD_Code': b_code
    }

    response = requests.get(url, params=params)
    response_str = response.content

    root = ET.fromstring(response_str)

    data = []
    # 데이터 추출
    items = root.find('body').find('items')
    if items is not None:
        for item in items.findall('item'):
            item_data = {
                'No': item.find('No').text,
                'BJD_Code': item.find('BJD_Code').text,
                'Any_Year': item.find('Any_Year').text,
                'Exam_Day': item.find('Exam_Day').text,
                'Exam_Type': item.find('Exam_Type').text,
                'PNU_Nm': item.find('PNU_Nm').text,
                'ACID': item.find('ACID').text,
                'VLDPHA': item.find('VLDPHA').text if item.find('VLDPHA') is not None else None,
                'VLDSIA': item.find('VLDSIA').text if item.find('VLDSIA') is not None else None,
                'OM': item.find('OM').text,
                'POSIFERT_MG': item.find('POSIFERT_MG').text if item.find('POSIFERT_MG') is not None else None,
                'POSIFERT_K': item.find('POSIFERT_K').text,
                'POSIFERT_CA': item.find('POSIFERT_CA').text if item.find('POSIFERT_CA') is not None else None,
                'SELC': item.find('SELC').text if item.find('SELC') is not None else None,
            }
            data.append(item_data)
    else:
        print("데이터가 없습니다.")

    return data


@csrf_exempt
def soil_exam_result(request):
    if request.method == 'POST':
        crop_name = request.POST.get('crop_name')
        address = request.POST.get('address')
        if crop_name and address:
            b_code = get_b_code(address)
            soil_data = get_soil_exam_data(b_code)
            result = {
                'crop_name': crop_name,
                'address': address,
                'soil_data': soil_data
            }
            return render(request, 'result.html', {'result': result})
        else:
            return HttpResponse('Address and crop name are required', status=400)
    return render(request, 'soil_exam_form.html')





import requests
import xml.etree.ElementTree as ET
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_soil_fertilizer_info(request):
    if request.method == 'POST':
        url = 'http://apis.data.go.kr/1390802/SoilEnviron/FrtlzrUseExp/getSoilFrtlzrExprnInfo'
        params = {
            'serviceKey': '1/eYLkvnjZNKzzUpbpb+/VWWmZExnS0ave8VahtkI0X3CiletYaxBgBnlvunpx8tckfsXBogJJIQJayprpZbmA==',
            'crop_Code': '07032',# csv에서 가져와서 적용필요!!!
            'acid': request.POST.get('acid') if request.POST.get('acid') is not None else '0',
            'om': request.POST.get('om') if request.POST.get('om') is not None else '0',
            'vldpha': request.POST.get('vldpha') if request.POST.get('vldpha') is not None else '0',
            'posifert_K': request.POST.get('posifert_k') if request.POST.get('posifert_k') is not None else '0',
            'posifert_Ca': request.POST.get('posifert_ca') if request.POST.get('posifert_ca') is not None else '0',
            'posifert_Mg': request.POST.get('posifert_mg') if request.POST.get('posifert_mg') is not None else '0',
            'vldsia': request.POST.get('vldsia') if request.POST.get('vldsia') is not None else '0',
            'selc': request.POST.get('selc') if request.POST.get('selc') is not None else '0',
        }
        response = requests.get(url, params=params)

        # API 응답 디코딩
        response_content = response.content.decode('utf-8')

        # XML 파싱
        root = ET.fromstring(response_content)

        # body 요소가 존재하는지 확인
        body = root.find('body')
        if body is None:
            return render(request, 'error.html', {'message': 'No body element found in response.'})

        # items 요소가 존재하는지 확인
        items = body.find('items')
        if items is None:
            return render(request, 'error.html', {'message': 'No items element found in response.'})

        # 데이터 추출
        data = []
        for item in items.findall('item'):
            item_data = {
                'crop_Code': item.find('crop_Code').text if item.find('crop_Code') is not None else None,
                'crop_Nm': item.find('crop_Nm').text if item.find('crop_Nm') is not None else None,
                'pre_Fert_N': item.find('pre_Fert_N').text if item.find('pre_Fert_N') is not None else None,
                'pre_Fert_P': item.find('pre_Fert_P').text if item.find('pre_Fert_P') is not None else None,
                'pre_Fert_K': item.find('pre_Fert_K').text if item.find('pre_Fert_K') is not None else None,
                'post_Fert_N': item.find('post_Fert_N').text if item.find('post_Fert_N') is not None else None,
                'post_Fert_P': item.find('post_Fert_P').text if item.find('post_Fert_P') is not None else None,
                'post_Fert_K': item.find('post_Fert_K').text if item.find('post_Fert_K') is not None else None,
                'pre_Compost_Cattl': item.find('pre_Compost_Cattl').text if item.find('pre_Compost_Cattl') is not None else None,
                'pre_Compost_Pig': item.find('pre_Compost_Pig').text if item.find('pre_Compost_Pig') is not None else None,
                'pre_Compost_Chick': item.find('pre_Compost_Chick').text if item.find('pre_Compost_Chick') is not None else None,
                'pre_Compost_Mix': item.find('pre_Compost_Mix').text if item.find('pre_Compost_Mix') is not None else None,
            }
            data.append(item_data)

        return render(request, 'fertilizer_info.html', {'data': data})
    return render(request, 'error.html', {'message': 'Invalid request method.'})






