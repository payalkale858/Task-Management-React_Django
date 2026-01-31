from pathlib import Path
import os
import dj_database_url  # for Render production DB

# --------------------------
# Paths
# --------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------
# Security
# --------------------------
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-insecure-ojufiv=o$#v42n$lzt4mpyk6zdg*eog!v+kp+)xzg#frccn-!r"
)

DEBUG = os.environ.get("DEBUG", "True") == "True"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "task-management-react-django-1.onrender.com",
]

# --------------------------
# Applications
# --------------------------
INSTALLED_APPS = [
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "app",  # your app
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # serve static files
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# --------------------------
# URLs & WSGI
# --------------------------
ROOT_URLCONF = "backend.urls"
WSGI_APPLICATION = "backend.wsgi.application"

# --------------------------
# Database
# --------------------------
# Use Render PostgreSQL if DATABASE_URL is set, otherwise default SQLite
DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600
    )
}

# --------------------------
# Password validation
# --------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------------
# Internationalization
# --------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --------------------------
# Static files (WhiteNoise)
# --------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --------------------------
# Default primary key
# --------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --------------------------
# CORS (for React frontend)
# --------------------------
CORS_ALLOW_ALL_ORIGINS = True
