from fastapi import HTTPException, UploadFile

MAX_FILE_SIZE = 5 * 1024 * 1024 # 5MB limit

def validate_file(file: UploadFile):

    if not (file.filename.endswith(".csv") or file.filename.endswith(".xlsx")):
        raise HTTPException(status_code=400, detail="Only CSV or XLSX allowed")
        
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 5MB")