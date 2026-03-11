import smtplib
from email.mime.text import MIMEText
import logging
from .config import SMTP_SERVER, SMTP_PORT, EMAIL_USER, EMAIL_PASSWORD

logger = logging.getLogger(__name__)

def send_email(recipient, summary):

    if not all([SMTP_SERVER, EMAIL_USER, EMAIL_PASSWORD]):
        logger.warning("Email credentials not fully configured. Skipping actual email send.")
        print(f"--- MOCK EMAIL TO {recipient} ---\n{summary}\n----------------------")
        return

    msg = MIMEText(summary)

    msg["Subject"] = "Quarterly Sales Insight"
    msg["From"] = EMAIL_USER
    msg["To"] = recipient

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USER, recipient, msg.as_string())
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        raise Exception(f"Email service error: {str(e)}")