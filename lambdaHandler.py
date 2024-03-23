import json
from bardapi import Bard
import boto3


def lambda_handler(event, context):
   
    # print(event)
    param1 = str(json.loads(event['body'])['key1']) + '\n'
    param2 = str(json.loads(event['body'])['key2']) + '\n'
    param3 = str(json.loads(event['body'])['key3']) + '\n'
    param4 = str(json.loads(event['body'])['key4']) + '\n'
    param5 = str(json.loads(event['body'])['key5']) + '\n'
    param6 = str(json.loads(event['body'])['key6']) + '\n'
    # param1 = 'Energy'
    # param2 = 'Communication'
    # param3 = 'Healthcare'
    # param4 = 'AAPL'
    # param5 = 'NVDA'
    # param6 = 'GOOGL'
    sender_email = "willzhang@utexas.edu"
    recipient_email = "willzhang@utexas.edu"
    ses = boto3.client('ses')
    subject = "Your Finbits Newsletter"
           
    # responseBody = 'Hi'
    
html_response = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FinBits Report</title>
<style>
    body {{
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
    }}
    .container {{
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
    }}
    .header {{
        text-align: center;
        margin-bottom: 20px;
    }}
    .section {{
        margin-bottom: 30px;
    }}
    .section-title {{
        font-size: 20px;
        margin-bottom: 10px;
        color: #333;
    }}
    .section-content {{
        color: #666;
        margin-bottom: 20px;
    }}
    .article-link {{
        display: block;
        margin-top: 10px;
        text-decoration: none;
        color: #007bff;
    }}
    .article-link:hover {{
        text-decoration: underline;
    }}
    hr.solid {{
        border-top: 3px solid #bbb;
    }}
    .center {{
        margin-left: auto;
        margin-right: auto;
    }}
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="https://i.imgur.com/DdDKGkI.png" alt="Banner" width="100%">
        <p style="text-align:center"> Your curated market and portfolio report is here.</p>
    </div>
    
    <hr class="solid">

    <div class="section">
        <h2 class="section-title" style="text-align:center"> <i> YOUR SECTOR SUMMARIES </i> </h2>

        <div class="section-content">
            <h3>{param1}</h3>
            <p>{responseBody1}</p>
        </div>

        <div class="section-content">
            <h3>{param2}</h3>
            <p>{responseBody2}</p>
        </div>

        <div class="section-content">
            <h3>{param3}</h3>
            <p>{responseBody3}</p>
        </div>
    </div>

    <hr class="solid">

    <div class="section">
        <h2 class="section-title" style="text-align:center"> <i> YOUR PORTFOLIO PERFORMANCE </i> </h2>

        <div class="section-content">
            <h3>TOP 3 MOVERS:</h3>
            <p> ↘️ {param4}: {responseBody4}</p>
            <p> ↗️ {param5}: {responseBody5}</p>
            <p> ↘️ {param6}: {responseBody6}</p>

        </div>

    </div>

    <hr class="solid">

    <div class="section">
        <h2 class="section-title" style="text-align:center"> <i> GENERAL NEWS </i> </h2>

        <div class="section-content">
            <h3>Article 1:</h3>
            <p>{responseBody7}</p>
            <a href="#" class="article-link">Read more</a>
        </div>

        <div class="section-content">
            <h3>Article 2:</h3>
            <p>{responseBody8}</p>
            <a href="#" class="article-link">Read more</a>
        </div>

        <div class="section-content">
            <h3>Article 3:</h3>
            <p>{responseBody9}</p>
            <a href="#" class="article-link">Read more</a>
        </div>
    </div>
</div>
</body>
</html>'''

try:
    response = ses.send_email(
        Source=sender_email,
        Destination={
            'ToAddresses': [recipient_email],
        },
        Message={
            'Subject': {
                'Data': subject,
            },
            'Body': {
                'Html': {
                    'Charset': 'UTF-8',
                    'Data': html_response,
                },
            },
        },
    )
    print(f"Email sent! Message ID: {response['MessageId']}")
    return {
        'statusCode': 200,
        'body': json.dumps('Email sent successfully')
    }
except Exception as e:
    print(f"Error sending email: {e}")
    return {
        'statusCode': 500,
        'body': json.dumps('Error sending email')
    }
