import os
import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет письмо с выбранной датой и временем прогулки на почту ken.kaneki.06@mail.ru"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    date = body.get('date', '')
    time = body.get('time', '')

    email = 'ken.kaneki.06@mail.ru'
    password = os.environ['EMAIL_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = '🤍 Юля выбрала дату прогулки!'
    msg['From'] = email
    msg['To'] = email

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fff8f8; border-radius: 16px;">
        <h1 style="color: #c9748a; font-size: 28px; margin-bottom: 8px;">🤍 Юля согласилась!</h1>
        <p style="color: #888; font-size: 16px; margin-bottom: 24px;">Она выбрала дату и время для вашей прогулки:</p>
        <div style="background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 12px rgba(201,116,138,0.1);">
            <p style="font-size: 20px; color: #333; margin: 0 0 12px 0;">📅 <b>{date}</b></p>
            <p style="font-size: 20px; color: #333; margin: 0;">🕊️ <b>{time}</b></p>
        </div>
        <p style="color: #c9748a; font-size: 15px; margin-top: 24px; font-style: italic;">Не опаздывай 🌸</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(email, password)
        server.sendmail(email, email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }
