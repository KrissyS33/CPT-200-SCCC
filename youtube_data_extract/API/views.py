from http.client import HTTPResponse
import stat
from django.http import HttpResponse
from django.shortcuts import render
import os
import google.oauth2.credentials
import google_auth_oauthlib.flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import InstalledAppFlow
from django.templatetags.static import static
from youtube_data_extract.settings import BASE_DIR
import csv  

SCOPES = ['https://www.googleapis.com/auth/yt-analytics.readonly']

API_SERVICE_NAME = 'youtubeAnalytics'
API_VERSION = 'v2'
CLIENT_SECRETS_FILE = os.path.join(BASE_DIR,'API\static\secret file.json')

def get_service():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
    ##credentials = flow.run_console()
    credentials = flow.run_local_server(host='localhost',
    port=8080, 
    authorization_prompt_message='Please visit this URL: {url}', 
    success_message='The auth flow is complete; you may close this window.',
    open_browser=True)
    return build(API_SERVICE_NAME, API_VERSION, credentials = credentials)

def execute_api_request(client_library_function, **kwargs):
    response = client_library_function(
    **kwargs
    ).execute()

    header = response['columnHeaders']
    rows = response['rows']
    
    csvResponse = HttpResponse(
        content_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="youtube_data.csv"'},
    )

    csvWriter = csv.writer(csvResponse)

    headerIndex = 0
    headerList = []

    for x in header:
      tempDict = header[headerIndex]
      headerList.append(tempDict['name'])
      headerIndex += 1
      
    csvWriter.writerow(headerList)
    
    rowIndex = 0

    for y in rows:
      tempList = rows[rowIndex]
      csvWriter.writerow(tempList)
      rowIndex += 1
    
    return csvResponse

def api(request):
    # Disable OAuthlib's HTTPs verification when running locally.
    # *DO NOT* leave this option enabled when running in production.
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    youtubeAnalytics = get_service()

    metricsString = ''
    
    if request.GET.get('request1') == 'views':
       metricsString += ',' + request.GET.get('request1') 

    if request.GET.get('request2') == 'comments':
       metricsString += ',' + request.GET.get('request2')

    if request.GET.get('request3') == 'likes':
       metricsString += ',' + request.GET.get('request3')

    if request.GET.get('request4') == 'dislikes':
       metricsString += ',' + request.GET.get('request4')

    if request.GET.get('request5') == 'estimatedMinutesWatched':
       metricsString += ',' + request.GET.get('request5')

    if request.GET.get('request6') == 'averageViewDuration':
       metricsString += ',' + request.GET.get('request6')

    if request.GET.get('request7') == 'subscribersGained':
       metricsString += ',' + request.GET.get('request7')

    if request.GET.get('request8') == 'subscribersLost':
       metricsString += ',' + request.GET.get('request8')

    if request.GET.get('request9') == 'shares':
       metricsString += ',' + request.GET.get('request9')

    if request.GET.get('request10') == 'annotationClickThroughRate':
       metricsString += ',' + request.GET.get('request10')

    if request.GET.get('request11') == 'annotationCloseRate':
       metricsString += ',' + request.GET.get('request11')  

    #TODO: ERROR handling for future data requests
    return(execute_api_request(
    youtubeAnalytics.reports().query,
    ids='channel==MINE',
    startDate= request.GET.get('startDate'),
    endDate= request.GET.get('endDate'),
    metrics=metricsString,
    dimensions='day',
    sort='day'
    ))