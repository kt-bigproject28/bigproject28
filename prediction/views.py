import pandas as pd
from django.shortcuts import render
from django.http import HttpResponse


# CSV 파일 경로
CSV_FILE_PATH = 'prediction/all_crop_data.csv'

def predict_income(request):
    if request.method == 'POST':
        # 사용자 입력 받기
        land_area = float(request.POST.get('land_area'))
        crop_names = request.POST.getlist('crop_name')
        crop_ratios = request.POST.getlist('crop_ratio')

        # 비율 합 확인
        crop_ratios = [float(ratio) for ratio in crop_ratios]
        if sum(crop_ratios) != 1:
            return HttpResponse('작물 비율의 합은 1이어야 합니다.')

        # CSV 파일에서 데이터 읽기
        df = pd.read_csv(CSV_FILE_PATH, encoding='utf-8')
        
        df['소득률 (%)'] = df['소득률 (%)'].astype(str)
        df['부가가치율 (%)'] = df['부가가치율 (%)'].astype(str)

        total_predicted_value = 0
        crop_results = []
        for crop_name, crop_ratio in zip(crop_names, crop_ratios):
            # 작물명에 해당하는 최신 시기의 데이터 가져오기
            crop_data = df[df['작물명'] == crop_name]
            if not crop_data.empty:
                latest_crop_data = crop_data.sort_values(by='시점', ascending=False).iloc[0]
                crop_income = latest_crop_data['소득 (원)']
                latest_year = latest_crop_data['시점']

                # 토지면적과 작물 비율 적용하여 최종 값을 계산
                adjusted_income = (crop_income / 302.5) * land_area * crop_ratio
                total_predicted_value += adjusted_income
                

                # 각 컬럼 값에 작물 비율과 토지면적 적용
                adjusted_data = latest_crop_data.copy()
                for col in adjusted_data.index:
                    if pd.api.types.is_numeric_dtype(adjusted_data[col]):
                        adjusted_data[col] = (adjusted_data[col] / 302.5) * land_area * crop_ratio

                # 결과 저장
                crop_results.append({
                    'crop_name': crop_name,
                    'latest_year': latest_year,
                    'adjusted_data': adjusted_data.to_dict()
                })
            else:
                return HttpResponse(f'{crop_name}의 데이터를 찾을 수 없습니다.')

        # 결과를 HTML로 반환
        return render(request, 'result.html', {
            'total_income': total_predicted_value,
            'results': crop_results
        })

    else:
        return render(request, 'form.html')