import pandas as pd
from django.shortcuts import render
from django.http import HttpResponse
import requests
import pandas as pd
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet

# CSV 파일 경로
CSV_FILE_PATH = 'prediction/all_crop.csv' #수익률 예측
CSV_FILE_PATH_1 = 'prediction/predict_code.csv' #품목 코드
re = {'서울':['1101','108'], '부산':['2100','159'], '대구':['2200','143'], '광주':['2401','156'], '대전':['2501','133'],}

def predict_income(request):
    if request.method == 'POST':
        # 사용자 입력 받기
        land_area = float(request.POST.get('land_area'))
        crop_names = request.POST.getlist('crop_name')
        crop_ratios = request.POST.getlist('crop_ratio')
        region = request.POST.get('region')

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
                        
                #시세 가져오기
                url = 'http://www.kamis.or.kr/service/price/xml.do'
                #오늘 날짜 기준으로 어제부터 1년전 시세 불러오기
                date_2 = datetime.now() - timedelta(1)
                date_2 = date_2.strftime("%Y%m%d")
                date_1 = datetime.now() - timedelta(1) - timedelta(365)
                date_1 = date_1.strftime("%Y%m%d")
                # CSV 파일에서 데이터 읽기
                price_code = pd.read_csv(CSV_FILE_PATH_1, encoding='utf-8')
                itemcategorycode = int(price_code.loc[price_code['품목명'] == crop_name, '부류코드'].values[0])
                itemcode = int(price_code.loc[price_code['품목명'] == crop_name, '품목코드'].values[0])
                countrycode = re[region][0]
                params = {
                    'action': 'periodProductList',
                    'p_productclscode': '02',
                    'p_startday': date_1,
                    'p_endday': date_2,
                    'p_itemcategorycode': itemcategorycode,
                    'p_itemcode': itemcode,
                    'p_kindcode': '',
                    'p_productrankcode': '',
                    'p_countrycode': countrycode,
                    'p_convert_kg_yn': 'Y',
                    'p_cert_key': '5d554929-4444-4cf8-9c58-618f30877777',
                    'p_cert_id': '4540',
                    'p_returntype': 'xml'
                }
                response = requests.get(url, params=params)

                # 요청이 성공했는지 확인
                if response.status_code == 200:
                    root = ET.fromstring(response.content)

                    # XML 데이터를 파싱하여 필요한 컬럼만 데이터프레임으로 변환
                    data = []
                    for item in root.findall('.//item'):
                        row = {
                            'yyyy': item.find('yyyy').text if item.find('yyyy') is not None else None,
                            'regday': item.find('regday').text if item.find('regday') is not None else None,
                            'itemname': item.find('itemname').text if item.find('itemname') is not None else None,
                            'price': item.find('price').text if item.find('price') is not None else None
                        }
                        data.append(row)

                    df_1 = pd.DataFrame(data)
                    # 'regday'를 MM-DD 형식으로 변환
                    df_1['regday'] = df_1['regday'].apply(lambda x: x.replace('/', '-') if x else '')
                    # 가격에서 쉼표 제거 및 숫자로 변환
                    df_1['price'] = df_1['price'].replace('-', 'NaN').str.replace(',', '').astype(float)  # '-'를 NaN으로 대체

                    # 'yyyy'와 'regday'를 합쳐 'tm' 컬럼 생성
                    df_1['tm'] = df_1['yyyy'] + '-' + df_1['regday']

                    # 'yyyy'와 'regday' 컬럼 삭제
                    df_1.drop(columns=['yyyy', 'regday'], inplace=True)
                    df_1.dropna(inplace = True)
                    df_1 = df_1.reset_index(drop=True)
                    df_1['tm'] = pd.to_datetime(df_1['tm'])

                else:
                    return HttpResponse(f'{crop_name}의 데이터를 찾을 수 없습니다.')
                
                #날짜 가져오기
                stnIds = re[region][1]
                url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'
                params ={
                    'serviceKey': '1/eYLkvnjZNKzzUpbpb+/VWWmZExnS0ave8VahtkI0X3CiletYaxBgBnlvunpx8tckfsXBogJJIQJayprpZbmA==',
                    'pageNo': '1',
                    'numOfRows': '365',
                    'dataType': 'XML',
                    'dataCd': 'ASOS',
                    'dateCd': 'DAY',
                    'startDt': date_1,
                    'endDt': date_2,
                    'stnIds': stnIds
                }
                
                response = requests.get(url, params=params)
                # 요청이 성공했는지 확인
                if response.status_code == 200:

                    # XML 파싱
                    root_1 = ET.fromstring(response.content)

                    # 필요한 컬럼들만 선택
                    columns = ['tm', 'avgRhm', 'minTa', 'maxTa', 'maxWs', 'avgTa', 'avgWs' , 'sumRn', 'ddMes']

                    # XML 데이터에서 필요한 정보 추출
                    data = []
                    for item in root_1.iter('item'):
                        row = {child.tag: child.text for child in item if child.tag in columns}
                        data.append(row)
                    df_2 = pd.DataFrame(data, columns=columns)
                    for col in columns[1:]:
                        df_2[col] = pd.to_numeric(df_2[col], errors='coerce')

                    # 데이터프레임으로 변환

                    df_2.fillna(0, inplace=True)
                    df_2['tm'] = pd.to_datetime(df_2['tm'])
                else:
                    return HttpResponse(f'{crop_name}의 데이터를 찾을 수 없습니다.')
                
                #두 데이터 프레임 합쳐서 시세 예측하기
                #시세 날짜 데이터 기준으로 날씨 데이터 행 가져오기
                start = df_1['tm'].iloc[0].strftime('%Y%m%d')
                end = df_1['tm'].iloc[-1].strftime('%Y%m%d')
                df_3 = df_2[(df_2['tm'] >= start) & (df_2['tm'] <= end)]
                
                #시세 날짜 데이터에 따른 날씨 데이터
                df_3 = df_3.reset_index(drop=True)
                
                #합치기
                merged_df = pd.merge(df_3, df_1, on='tm', how='left')
                merged_df.drop('itemname', axis = 1, inplace = True)
                #결측치 선형 보간
                merged_df['price'] = merged_df['price'].ffill()
                # merged_df['price'] = merged_df['price'].fillna(method='bfill')
                # 시세 데이터를 한 칸씩 뒤로 이동
                merged_df['price'] = merged_df['price'].shift(-1)

                # NaN 값 제거 (예측을 위해 마지막 행은 NaN이 될 수 있음)
                merged_df.dropna(subset=['price'], inplace=True)
                # 연, 월, 일 컬럼 생성
                merged_df['year'] = merged_df['tm'].dt.year
                merged_df['month'] = merged_df['tm'].dt.month
                merged_df['day'] = merged_df['tm'].dt.day

                # 특성과 목표 변수를 분리
                X = merged_df.drop(['price', 'tm'], axis =1)
                y = merged_df.loc[:,'price']

                # 데이터를 훈련 세트와 테스트 세트로 분할
                X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1, shuffle=False)

                # 엘라스틱넷 회귀 모델 생성 및 훈련
                model = ElasticNet(alpha=0.1, l1_ratio=0.5, max_iter=10000)
                model.fit(X_train, y_train)
                #어제의 날씨를 이용해서 오늘 시세 예측
                target = df_2.iloc[[-1]].copy()
                # 연, 월, 일 컬럼 생성
                target.loc[:, 'year'] = target['tm'].dt.year
                target.loc[:, 'month'] = target['tm'].dt.month
                target.loc[:, 'day'] = target['tm'].dt.day
                target.drop('tm', axis=1, inplace=True)
                pred_value = int(model.predict(target))

                # 결과 저장
                crop_results.append({
                    'crop_name': crop_name,
                    'latest_year': latest_year,
                    'adjusted_data': adjusted_data.to_dict(),
                    'price': pred_value
                })
                
                
            else:
                return HttpResponse(f'{crop_name}의 데이터를 찾을 수 없습니다.')
        
        # 결과를 HTML로 반환
        return render(request, 'result.html', {
            'total_income': total_predicted_value,
            'results': crop_results, 
        })

    else:
        return render(request, 'form.html')