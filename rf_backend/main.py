from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
import subprocess
import re
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend's origin (React app)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Content-Type, Authorization, etc.)
)

logging.basicConfig(format='%(message)s')

UPLOAD_DIR = "/opt/upload"
SHARED_DIR = "/opt/shared"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/")
async def index(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        file_stats = os.stat(file_path)
        metadata = {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": file_stats.st_size,
        }

        args = ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', SHARED_DIR, file_path]

        process = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=None)
        pdf_filename = re.search('-> /opt/shared/(.*?) using filter', process.stdout.decode())

        logging.warning(f"File uploaded successfully: {metadata}")
        return {"metadata": metadata, "link": f"/static/{pdf_filename.group(1)}"}

    except Exception as e:
        logging.error(f"File upload failed: {e}")
        raise HTTPException(status_code=500, detail="Something went wrong")
